import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const DashboardNavbar = ({items}: DashboardNavbarProps) => {

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href='/dashboard'>Dashboard</Navbar.Brand>
      <Nav className='container-fluid'>
        {items.map(e => (
          <Nav.Link
            href={e.path} 
            onClick={e.onClick}
            className={e.float ? e.float : ''}
            >
            {e.value}
          </Nav.Link>
        ))}
        <Nav.Link>
        </Nav.Link>
      </Nav>
    
    </Navbar>
  )
}