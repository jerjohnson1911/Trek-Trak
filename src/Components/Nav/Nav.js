import React, {useEffect} from 'react'
import axios from 'axios'
import {updateUser, logout} from '../../redux/reducer'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function Nav(props){


useEffect(() => {
    axios.get('/api/auth/me')
    .then(res => props.updateUser(res.data))
    
}, [props])

//useeffect can have the functionality built in and can utilize useEffect unlimited times.
// function getUser(){
//     axios.get('/api/auth/me')
//     .then(res => props.updateUser(res.data))
// }


function logoutUser() {
    axios.post('/api/auth/logout')
      .then(_ => logout)
  }


return(
    props.location.pathname !== '/' &&
    <div>
<Link to='/posts'>
<button>Posts</button>
</Link>
<Link to='/new'>
    <button>New Post</button>
</Link>

<Link to='/' onClick={logoutUser}>
<button>Logout</button>
</Link>

<Link to='/map'>
<button>Map</button>
</Link>

</div>
)
}

const mapStateToProps = (state) => state


export default withRouter( connect(mapStateToProps, {updateUser, logout})(Nav))
// export default Nav