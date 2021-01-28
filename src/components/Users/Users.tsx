import React, { FC, useEffect } from 'react'
import styles from './Users.module.css'

import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'
import { FilterType, requestUsers } from '../../redux/users-reducer'
import { UsersSearchForm } from './UsersSearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
import { parseJsonSourceFileConfigFileContent } from 'typescript'


type PropsType = { }

type QueryParamsType = {term?: string; page?: string; friend?: string}

export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const history = useHistory()

    
    useEffect(() => {

      const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
      
      let actualPage = currentPage
      let actualFilter = filter

      if (!!parsed.page)  actualPage = Number(parsed.page)
      if (!!parsed.term)  actualFilter = {... actualFilter, term: parsed.term as string}
      
      switch(parsed.friend) {
        case "null":
          actualFilter = {... actualFilter, friend: null }
          break
        case 'true':
          actualFilter = {... actualFilter, friend: true }
          break
        case 'false':
          actualFilter = {... actualFilter, friend: false }
          break
      }

      
      // if (!!parsed.friend)  actualFilter = {... actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}

      dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
      const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)



      history.push({
        pathname: '/users',
        search: queryString.stringify(query)
        //search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
      })
    }, [filter, currentPage])


    const onPageChanged = (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
      dispatch(requestUsers(1, pageSize, filter))
  }

  const follow = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

    return <div>

        < UsersSearchForm onFilterChanged = {onFilterChanged}  />
       
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                    totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
        {
            users.map(u => <User user={u}
                                followingInProgress={followingInProgress}
                                key={u.id}
                                unfollow={unfollow}
                                follow={follow} />)
                
        }
        </div>
    </div>
}

