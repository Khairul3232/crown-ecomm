import { takeLatest, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
    yield console.log('I am HERE');
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error));
    }

        // dispatch(fetchCollectionsStart());

        // collectionRef.get().then(snapshot => { 
        //     // console.log("snapshot: ",snapshot);
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log("collectionsMap: ", collectionsMap);
        //     dispatch(fetchCollectionsSuccess(collectionsMap));
        //     // this.setState({ loading: false });
        // }).catch(error=>dispatch(fetchCollectionsFailure(error)));
    
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync);
}