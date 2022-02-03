import React, { useState } from "react";
import styles from "./index.module.scss";
import Logo from 'assest/img/logo.png'
import { mockData } from "components/constants";
import { useDispatch } from "react-redux";
import { handleSearch } from "redux/slices/mockData";
import { Link } from 'react-router-dom';

export const Main: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();

  const handleSearchOnChange = (e) => {
    if (!!e.target.value) {
      const searchResult = []
      mockData.data.forEach((data) => {
        data.forEach((element) => {
          if (element.toLowerCase().includes(e.target.value?.toLowerCase())) {
            searchResult.push(data);
          }
        })
      })
      dispatch(handleSearch({ searchKey: e.target.value, mockData: searchResult }));
      setSearchValue(e.target.value);
      setSearchResult(searchResult.slice(0, 3));
    }
    else {
      setSearchValue('');
      setSearchResult([]);
    }

  }

  return (
    <div className={styles.main}>
      <div className={styles.logopart}>
        <img src={Logo} alt="Logo" />
        <span>Search web app</span>
      </div>
      <div className={styles.searchpart}>
        <div className={styles.searchinput}>
          <input className={styles.input} onChange={handleSearchOnChange} />
          <Link to={'/searchresult?searchkey=' + searchValue} >
            <button>Search</button>
          </Link>
        </div>
        <div className={styles.searchresult} style={{ display: searchResult.length === 0 ? 'none' : 'block' }}>
          <ul>
            {
              searchResult.map((e, i) => {
                return (
                  <li>
                    <div className={styles.country}>
                      <span>{e[4] + '-' + e[5]}</span>
                      <span>{e[3]}</span>
                    </div>
                    <div className={styles.email}>
                      <span>Email:</span>
                      <span>{e[2]}</span>
                    </div>
                  </li>

                )
              })
            }
          </ul>
          <Link to={'/searchresult?searchkey=' + searchValue} >
            <span>Show more...</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
