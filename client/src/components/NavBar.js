import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

const NavBar = () => {
    


  return (
    <Box>
        <Link to="/home">
            <HomeIcon/>
        </Link>
    </Box>
  )
}

export default NavBar