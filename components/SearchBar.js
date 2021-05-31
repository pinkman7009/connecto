import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

import { Icon, InlineIcon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import magnifyingGlass from '@iconify/icons-radix-icons/magnifying-glass';

import { usersBySearch } from '../services/firebase';
import useDebounce from '../hooks/useDebounce';

import Link from 'next/link';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchFields, setSearchFields] = useState([]);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const getUsersBySearch = async () => {
      console.log('debounced search', debouncedSearch);
      const response = await usersBySearch(debouncedSearch);

      setSearchFields(response);
    };
    if (debouncedSearch !== '') getUsersBySearch();
    else setSearchFields([]);
  }, [debouncedSearch]);

  return (
    <div className={styles.searchbox}>
      <input
        type='text'
        placeholder='search users,colleges,events,groups'
        className={styles.search}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Icon icon={magnifyingGlass} className={styles.magnify} />
      {searchFields.length > 0 ? (
        <ul className={styles.autocomplete}>
          {searchFields.map((field, index) => (
            <Link href='/profile/[id]' as={`/profile/${field.userId}`}>
              <li
                className={styles.searchField}
                key={index}
                onClick={() => setSearchInput('')}
              >
                <div className={styles.avatar}>
                  <Icon
                    icon={bxsUser}
                    style={{ color: '#6e49ff', fontSize: '30px' }}
                  />
                </div>
                {field.fullName}
              </li>
            </Link>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
