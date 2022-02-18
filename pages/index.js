import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Grid, Paper, TextField, Button, Container, Typography } from '@material-ui/core'
import { getUsers, saveUser } from '../services/user.service'

const useStyle = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  app: {
    height: '100%',
  },
  mb: {
    marginBottom: '1rem',
  }
}));

const Home = () => {
  const classes = useStyle();

  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSave = (e) => {
    e.preventDefault();
    if(user.firstName && user.lastName) {
      saveUser(user)
        .then(() => {
          setUser({ firstName: '', lastName: '' });
          loadUsers();
        })
        .catch((err) => {
          alert(err.message);
        })  
    } else if(!user.firstName) {
      alert('First Name required!');
    } else if(!user.lastName) {
      alert('Last Name required!');
    }
  }

  const loadUsers = () => {
    return getUsers()
      .then((res) => setUsers(res))
      .catch((err) => {
        alert(err.message);
      })
  }

  useEffect(() => {
    loadUsers();
  }, [users])

  return(
    <>
      <CssBaseline />
      <Container maxWidth="lg" style={{ hegith: '100vh' }}>
        <Paper style={{ height: '100%' }}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <TextField label="First Name" onChange={handleChange} name='firstName' value={user?.firstName}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Last Name" onChange={handleChange} name='lastName' value={user?.lastName}/>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleSave} variant="contained">Save</Button>
            </Grid>
          </Grid>
          <Grid container direction="column" alignItems="center" justifyContent="center">
            {!users?.length && 
            <Typography>No User</Typography>
            }
            {users?.length > 0 &&
            users.map((userItem) => (
              <Typography key={userItem.id}>{userItem.id} {userItem.firstName} {userItem.lastName}</Typography>
            ))
            }
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default Home;
