import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'

const Users = () => {
  const userlist = useSelector(state => state.users.userlist)
  const blogs = useSelector(state => state.blogs)


  return (
    <div>
      <h1 align="center">Users</h1>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
            {userlist.map(singleuser =>
              <TableRow key={singleuser._id + 5}>
                <TableCell>
                  <Link to={`/users/${singleuser._id}`}>{singleuser.name}</Link>
                </TableCell>
                <TableCell>
                  {blogs.filter(a => a.user._id === singleuser._id).length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users