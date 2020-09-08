import React from 'react'
import { 
    MenuItem,
    FormControl,
    Select
  } from '@material-ui/core'

function Header({ titleHeader, country, countries, onChangeDropdown }) {
    return (
        <div className="app__header">
            <h1>{titleHeader}</h1>
            <FormControl className="app__dropdown">
            <Select
                variant="outlined"
                value={country}
                onChange={onChangeDropdown}
            >
                <MenuItem key="worldwide" value="worldwide">Worldwide</MenuItem>
                {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
            </FormControl>
        </div>
    )
}

export default Header
