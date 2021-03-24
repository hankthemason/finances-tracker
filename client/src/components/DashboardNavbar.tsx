import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const DashboardNavbar = ({items}: DashboardNavbarProps) => {

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href='/dashboard'>Dashboard</Navbar.Brand>
      <Nav className='mr-auto'>
        {items.map(e => (
          <Nav.Link href={e.path}>
            {e.value}
          </Nav.Link>
        ))}

      </Nav>
    </Navbar>
  )
}