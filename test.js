function formatDate(userDate) {
    // format from M/D/YYYY to YYYYMMDD
    const parts = userDate.split('/')
    const formateRequired = `${parts[2]}${String(parts[0]).padStart(2, '0')}${String(parts[1]).padStart(2, '0')}`
    return formateRequired
  }
  
  console.log(formatDate("12/31/2014"));