import React, { useState } from "react";
import styles from "./index.module.scss";
import Logo from 'assest/img/logo.png'
import { useDispatch, useSelector } from "react-redux";
import Pagination from "components/pagination";
import { ReactComponent as SortIcon } from 'assest/img/sorticon.svg';
import { handleSearch } from "redux/slices/mockData";
import { Link } from 'react-router-dom'

const SearchResult: React.FC = () => {
    const dispatch = useDispatch()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const searchKey = useSelector((state: any) => state.mockData.searchKey)
    const filteredData = useSelector((state: any) => state.mockData.mockData)
    const pageSize = useSelector((state: any) => state.mockData.pageSize)
    const pageIndex = useSelector((state: any) => state.mockData.pageIndex)

    const handleFilter = (filter) => {
        let filterNameAsc = [...filteredData]
        switch (filter) {
            case 'name-asc':
                filterNameAsc = filterNameAsc.sort((a, b) => {
                    return a[0].localeCompare(b[0]); //using String.prototype.localCompare()
                });
                dispatch(handleSearch({ mockData: filterNameAsc, searchKey: '' }))
                break;
            case 'name-desc':
                filterNameAsc = [...filteredData]
                filterNameAsc = filterNameAsc.sort((a, b) => {
                    return b[0].localeCompare(a[0]); //using String.prototype.localCompare()
                });
                dispatch(handleSearch({ mockData: filterNameAsc, searchKey: '' }))
                break;
            case 'year-asc':
                filterNameAsc = [...filteredData]
                filterNameAsc = filterNameAsc.sort((a, b) => {
                    const key1 = new Date(a[3]);
                    const key2 = new Date(b[3]);
                    return key1.valueOf() - key2.valueOf();
                });
                dispatch(handleSearch({ mockData: filterNameAsc, searchKey: '' }))
                break;
            case 'year-desc':
                filterNameAsc = [...filteredData]
                filterNameAsc = filterNameAsc.sort((a, b) => {
                    const key1 = new Date(a[3]);
                    const key2 = new Date(b[3]);
                    return key2.valueOf() - key1.valueOf();
                });
                dispatch(handleSearch({ mockData: filterNameAsc, searchKey: '' }))
                break;
            default:
                break;
        }
    }

    const handleSearchOnChange = (e) => {
        if (!!e.target.value) {
          const searchResult = []
          filteredData.forEach((data) => {
            data.forEach((element) => {
              if (element.toLowerCase().includes(e.target.value?.toLowerCase())) {
                searchResult.push(data);
              }
            })
          })
          dispatch(handleSearch({ searchKey: e.target.value, mockData: searchResult }));
        }
        else {
            dispatch(handleSearch({ searchKey:'', mockData: '' }));

        }
    
      }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Link to='/'>
                    <img src={Logo} alt="Logo" />
                </Link>
                <input className={styles.input} defaultValue={searchKey} onChange={handleSearchOnChange} />
                <button className={styles.button}>
                    Search
                </button>
            </div>
            <div className={styles.searchandpagination}>
                <div className={styles.searchres}>
                    <div className={styles.sortarea}>
                        <div className={styles.sortbutton} onClick={() => setDropdownVisible(true)}>
                            <SortIcon />
                            <span>Order By</span>
                        </div>
                        <ul className={styles.sortmenu} style={{ display: dropdownVisible ? 'flex' : 'none' }}>
                            <li onClick={() => handleFilter('name-asc')}>Name ascending</li>
                            <li onClick={() => handleFilter('name-desc')}>Name descending</li>
                            <li onClick={() => handleFilter('year-asc')}>Year ascending</li>
                            <li onClick={() => handleFilter('year-desc')}>Year descending</li>
                        </ul>
                    </div>
                    <ul>
                        {
                            filteredData.slice((pageIndex * pageSize) - 10, pageSize * pageIndex).map((e, i) => {
                                return (
                                    <li key={i}>
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

                </div>
                <div>
                    <Pagination total={filteredData.length} pageSize={pageSize} />
                </div>
            </div>

        </div>
    );
};

export default SearchResult;