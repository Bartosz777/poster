import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    
    const resetPosition = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <header>
            <Link to='/'><h1 onClick={resetPosition}>Poster</h1></Link>
            <nav>
                {!user && 
                <div>
                    <Link to='/login'>Log in</Link> 
                    <Link to='/signup'>Sign up</Link>
                </div>}
                {user && 
                <div>
                    <Link 
                        onClick={resetPosition} 
                        to='/userposts' 
                        className='username'>{user.email}
                    </Link> 
                    <Link 
                        to='/add'>Add Post
                    </Link> 
                    <Link 
                        onClick={handleClick} 
                        to='/logout'>Log out
                    </Link></div>}
            </nav>
        </header>
    )
}

export default Navbar