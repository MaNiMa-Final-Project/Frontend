import React from 'react';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';



export default function BeatSpinner({isLoading}){

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;


    return <BeatLoader color={'#123abc'} loading={isLoading} css={override} />
}