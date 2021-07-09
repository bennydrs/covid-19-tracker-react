import { Card, CardContent, Typography } from "@material-ui/core"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Card style={{ marginTop: 16 }}>
      <CardContent>
        <footer>
          <Typography variant="body2" align="center">
            2020 - {year}
          </Typography>
        </footer>
      </CardContent>
    </Card>
  )
}

export default Footer
