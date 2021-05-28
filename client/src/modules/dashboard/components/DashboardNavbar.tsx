import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export const DashboardNavbar = ({items}: DashboardNavbarProps) => {

  return (
    <div className='navbar-wrapper'>
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href='/dashboard/home'>Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
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
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  </div>
  )
}