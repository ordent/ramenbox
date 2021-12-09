'use strict'

// const reservedKeyword = ['orderBy', 'direction', 'page', 'limit', 'relations', 'locale', 'array', 'json']

class RamenQueryResolver {
  constructor() { }

  // static commonQueryBuilder(builder, queryParams) {
  //   if (queryParams['array']) 
  //     this.resolveArray(builder, queryParams['array'])

  //   if (queryParams['locale']) 
  //     this.resolveLocale(builder, queryParams['locale'])

  //   if (queryParams['relations'])
  //     this.resolveRelations(builder, queryParams['relations'])

  //   if (queryParams['json'])
  //     this.resolveJson(builder, queryParams['json'])

  //   if (queryParams['orderBy'])
  //     this.resolveOrderBy(builder, queryParams['orderBy'], queryParams['direction'] ? queryParams['direction'] : 'desc')

  //   for (let key in queryParams){
  //     if (!reservedKeyword.includes(key))
  //       this.resolveOperator(builder, key, queryParams[key])
  //   }

  //   if (queryParams['page'])
  //     return builder.paginate(queryParams['page'], queryParams['limit'] ? queryParams['limit'] : 25)

  //   return builder.fetch()
  // }

  // static resolveRelations(builder, input) {
  //   let relations = input.split('@')
  //   relations.forEach(relationElement => {
  //     if (relationElement.includes('^')) {
  //       this.resolveQueryRelations(builder, relationElement)
  //     }
  //     else {
  //       builder.with(relationElement)
  //     }
  //   })
  //   return builder
  // }

  static resolveQueryRelations(builder, relationName, value) {
    const relationQueries = value.split(';')

    relationQueries.forEach(queryElement => {
      const objectElement = queryElement.split(':')
      builder.whereHas(relationName, (innerBuilder) => {
        this.resolveOperator(innerBuilder, objectElement[0], objectElement[1])
      })
    })
    return builder
  }

  static resolveOrderBy(builder, orderBy, direction) {
    orderBy = orderBy.split(',')
    for (const orderByEl of orderBy) {
      builder.orderBy(orderByEl, direction)
    }
    return builder
  }

  static resolveOperator(builder, columnName, comparevalues) {
    if (comparevalues.includes('|')) {

      comparevalues = comparevalues.replace('|', '')
      const comparators = comparevalues.split(',')
      if(!comparevalues.includes('|')){
        builder.orWhere((orBuilder) => {
          for (const comparator of comparators) {
            this.resolveWhere(orBuilder, columnName, comparator)
          }
        })
      }
    }
    const comparators = comparevalues.split(/,(?![^\[]*\])/)
    for (const comparator of comparators) {
      this.resolveWhere(builder, columnName, comparator)
    }
  }

  static resolveSpecialOperator(builder, columnName, compareWith) {
    let operatorFirstPriority = ['>=', '<=', '!=']
    let operatorSecondPriority = ['<', '>']
    let specialOperator = false

    for (const operatorElement of operatorFirstPriority) {
      if (compareWith.includes(operatorElement)) {
        specialOperator = operatorElement
        compareWith = compareWith.replace(operatorElement, '')
      }
    }

    for (const operatorElement of operatorSecondPriority) {
      if (compareWith.includes(operatorElement)) {
        specialOperator = operatorElement
        compareWith = compareWith.replace(operatorElement, '')
      }
    }

    if (!specialOperator) {
      return builder.where(columnName, compareWith)
    }
    return builder.orWhere(columnName, specialOperator, compareWith)
  }

  static resolveWhere(builder, columnName, compareWith) {
    let customOperator = false

    // if (compareWith.includes('<>') && compareWith.includes('|')) {
    //   this.resolveOrBetween(builder, columnName, compareWith)
    //   customOperator = true
    // }
    // else 
    // if (compareWith.includes('|')) {
    //   this.resolveAndBetween(builder, columnName, compareWith)
    //   customOperator = true
    // }
    // else if (compareWith.includes('|')) {
    //   this.resolveOr(builder, columnName, compareWith)
    //   customOperator = true
    // } else
    if (compareWith.includes('|')) {
      this.orRawBuilder(builder, columnName, compareWith)
      customOperator = true
    } else if (compareWith.startsWith('::')) {
      this.resolveJsonLike(builder, columnName, compareWith)
      customOperator = true
    } else if (compareWith.includes('$')) {
      this.resolveLike(builder, columnName, compareWith)
      customOperator = true
    } else if (columnName.charAt(0) === '{' && columnName.charAt(columnName.length - 1) === '}') {
      this.resolveJsonRaw(builder, columnName, compareWith)
      customOperator = true
    } else if (/^\[.*\]$/m.test(compareWith) || /^\[.*\]\!$/m.test(compareWith)) {
      this.resolveWhereIn(builder, columnName, compareWith)
      customOperator = true
    } else if (compareWith.includes('Ø')) {
      this.resolveIsNull(builder, columnName)
      customOperator = true
    }

    if (!customOperator) {
      this.resolveSpecialOperator(builder, columnName, compareWith)
    }
  }

  static orRawBuilder(builder, columnName, value) {
    value = value.split('|')
    let sql = ''
    const operators = ['>=', '<=', '!=', '$', '>', '<']
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '') continue;
      
      let _operator = null
      let _column = i < 1 ? columnName : value[i].split('=')[0]
      let _value = i < 1 ? value[i] : value[i].split(value[i].substring(0, value[i].indexOf('=') + 1))[1]

      if(_value.startsWith('::')){
        _value = _value.slice(2)
        _column = _column + _value.split('=')[0]
        _value = _value.slice(_value.indexOf('=') + 1)
      }

      for (const foundOperator of operators) {
        if (_value.includes(foundOperator)) {
          _operator = foundOperator
          _value = _value.replace(foundOperator, '')
          break
        }
      }

      if (!_operator) {
        if(i === 0) sql = `${_column} = '${_value}'`
        else sql = sql + `or ${_column} = '${_value}'`
      } else {
        if(_operator === '$') {
          if (builder.db.connectionClient === 'pg') {
            if(i === 0) sql = `${_column} ILIKE '%${_value}%'`
            else sql = sql + ` or ${_column} ILIKE '%${_value}%'`
          } else {
            if(i === 0) sql = `${_column} LIKE '%${_value}%'`
            else sql = sql + ` or ${_column} LIKE '%${_value}%'`
          }
        } else {
          if(i === 0) sql = `${_column} ${_operator} '${_value}'`
          else sql = sql + ` or ${_column} ${_operator} '${_value}'`
        }
      }
    }

    return builder.whereRaw(`(${sql})`)
  }

  static resolveOr(builder, columnName, value) {
    value = value.replace('|', '')
    builder.orWhere((orBuilder) => {
      orBuilder.orWhere(columnName, value)
    })
    return builder
  }

  // static resolveOrBetween(builder, columnName, value) {
  //   value = value.split('|')
  //   builder.orWhere((orBuilder) => {
  //     orBuilder.where(columnName, '>', value[0].replace(',', ''))
  //     orBuilder.where(columnName, '<', value[1])
  //   })
  //   return builder
  // }

  static resolveAndBetween(builder, columnName, value) {
    value = value.split(',')
    builder.where((andBuilder) => {
      andBuilder.where(columnName, '>', value[0].replace('|', ''))
      andBuilder.where(columnName, '<', value[1])
    })
    return builder
  }

  static resolveLike(builder, columnName, value) {
    value = value.slice(1)
    if (builder.db.connectionClient === 'pg') {
      return builder.whereRaw(`${columnName} ILIKE '%${value}%'`)
    } else {
      return builder.whereRaw(`${columnName} LIKE '%${value}%'`)
    }
  }

  static resolveJsonLike(builder, columnName, value) {
    value = value.slice(2)
    columnName = columnName + value.split('=')[0]
    value = value.slice(value.indexOf('=') + 1)

    return this.resolveLike(builder, columnName, value)
    // return this.resolveWhere(builder, columnName, value)
  }

  static resolveIsNull(builder, columnName) {
    return builder.whereNull(columnName)
  }


  static resolveWhereIn(builder, columnName, value) {
    let not = false
    if (value.endsWith('!')) {
      not = true
      value = value.substring(0, value.length - 1);
    }
    value = value.replace(/^\[|\]$/mg, '')
    if (not) {
      return builder.whereNotIn(columnName, value.split(','))
    }
    return builder.whereIn(columnName, value.split(','))
  }

  static resolveWhereWithOperator(builder, operator, columnName, value) {
    builder.where(columnName, operator, value)
    return builder
  }

  static resolveJson(builder, paramValue) {
    const queryParam = paramValue.split(':')
    const columns = queryParam[0].split('.')
    const value = queryParam[1]
    let queryStr = ''

    for (let i = 0; i < columns.length; i++) {
      let column = columns[i]
      if (i > 0)
        queryStr += "'" + column + "'"
      else
        queryStr += column

      if (i === columns.length - 2)
        queryStr = queryStr + '->>'
      else if (i != columns.length - 1)
        queryStr = queryStr + '->'
    }

    if (value.includes('%'))
      queryStr += ' like ?'
    else
      queryStr += ' = ?'

    builder.whereRaw(queryStr, value)
    return builder
  }

  static resolveJsonRaw(builder, query, value) {
    query = query.substring(1, query.length - 1)
    query += ' = ?'
    builder.whereRaw(query, value)
  }

  // static resolveArray(builder, value) {
  //   const parameters = value.split(';')
  //   for (const parameter of parameters) {
  //     const objects = parameter.split(':')
  //     const column = objects[0]
  //     const values = objects[1].split(',')
  //     let valueString = ''
  //     for (let i = 0; i < values.length; i++) {
  //       const value = values[i]
  //       valueString += value
  //       if (i < values.length-1) 
  //         valueString += ','
  //     }
  //     builder.whereRaw(column + "  && '{" + valueString + "}'")
  //   }
  //   return builder
  // }

  // static resolveLocale(builder, locale) {
  //   builder.whereRaw('locale->>\'' + locale + '\' IS NOT NULL')
  //   return builder
  // }

  // static async saveBelongsToManyRelations(genericModel, relationName, relationData) {
  //   await genericModel[relationName]().sync(relationData)
  // }

  // static async saveHasManyRelations(genericModel, relationName, relationData) {
  //   let relationObjs = await genericModel[relationName]().fetch()
  //   if (relationObjs.rows.length == 0) {
  //     for (const relationalData of relationData) {
  //       await genericModel[relationName]().create(relationalData)
  //     }
  //     return
  //   }

  //   let dataHelper = {}
  //   for(const relationalData of relationObjs.rows) {
  //     dataHelper[relationalData.id] = relationalData
  //   }

  //   for (const data of relationData) {
  //     if (!data.id) {
  //       await genericModel[relationName]().create(data)
  //       continue
  //     }

  //     const relationalData = dataHelper[data.id]
  //     Object.keys(data).forEach(key => {
  //       relationalData[key] = data[key]
  //     })
  //     await relationalData.save(trx)
  //   }
  //   return
  // }

  // static async saveHasOneRelations(genericModel, relationName, relationData) {
  //   let relationObj = await genericModel[relationName]().fetch()
  //   if (!relationObj) {
  //       await genericModel[relationName]().create(relationData)
  //       return
  //   }

  //   Object.keys(relationData).forEach(key => {
  //     relationObj[key] = relationData[key]
  //   })

  //   await relationObj.save()
  //   return
  // }

}

module.exports = RamenQueryResolver