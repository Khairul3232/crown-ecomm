import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth,createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() { 

    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { 
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // check if db has updated at that reference with the data, because we need to update state with id, and other info
        userRef.onSnapshot(snapShot => { 
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else {
        setCurrentUser(userAuth);
        addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({title, items})));
      }

    });
  }

  componentWillUnmount() { 
    this.unsubscribeFromAuth();
  }

  render() { 
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}
          />
        </Switch>      
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
