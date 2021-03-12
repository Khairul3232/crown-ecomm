import React from 'react';

import Spinner from '../spinner/spinner.component';

const WithSpinner = WrapperComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <Spinner />
    ) : (
            <WrapperComponent {...otherProps} />
    );
};

// same as the below

// const WithSpinner = WrapperComponent => {
//     const Spinner = ({ isLoading, ...otherProps }) => {
//         return isLoading ? (
//             <SpinnerOverlay>
//                 <SpinnerContainer />
//             </SpinnerOverlay>
//         ) : (
//                 <WrapperComponent {...otherProps} />
//             );
//     };
//     return Spinner;
// };



export default WithSpinner;