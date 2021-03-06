import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import { styled } from '@mui/material/styles'
import { styles } from './styles.scss'

const TableComponent = (props) => {
  const [rows, setRows] = useState([])
  const [filtRows, setFiltRows] = useState([])
  const [searched, setSearched] = useState('')
  const createData = (no, name, budget, spend, audited, id) => {
    return {
      no,
      name,
      budget,
      spend,
      audited,
      id
    }
  }
  let ogRows = [];
  useEffect(() => {
    for(let i=0; i<props.data.length; i++) {
      ogRows.push(createData(i+1, props.data[i].name, props.data[i].budget, props.data[i].description||1000, props.data[i].audited, props.data[i].id));
    }
    setRows(ogRows);
    setFiltRows(ogRows);
  }, [props.data]);
  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase())
    })
    setFiltRows(filteredRows);
  }
  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#737070'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))
  return (
    <div className={styles}>
      <SearchBar
        value={searched}
        onChange={searchVal => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        style={{ backgroundColor: '#212121', marginBottom: '10px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.headers.map((ele, ind) => {
                if(ind == 0) {
                  return(<TableCell>{ele}</TableCell>)
                } else {
                  return(<TableCell align="center">{ele}</TableCell>)
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtRows.map(row => {
              return(<StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => {window.setTimeout(()=> window.location.href ='#/projects?p_id='+row.id+'&p_name='+row.name, 300)}}
              >
                <TableCell component="th" scope="row">
                  {row.no}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.budget}</TableCell>
                <TableCell align="center">{row.spend}</TableCell>
                <TableCell align="center">{String(row.audited)}</TableCell>
              </StyledTableRow>);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
TableComponent.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array
}

TableComponent.defaultProps = {}
export default TableComponent
