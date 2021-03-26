import { useEffect, useState } from "react";
import axios from 'axios'

export default function SearchPokemon(query , pageNumber) {
    useEffect( () => {
        axios({
            method: 'GET',
            url : '',
            params : { q: query , page: pageNumber }
        });
    } , [query , pageNumber] )
  return null;
}
