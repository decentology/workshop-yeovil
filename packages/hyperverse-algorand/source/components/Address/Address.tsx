import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import useAlgorand from '../../useAlgorand';

const constants = {
  title: 'Account'
};

const styles = StyleSheet.create({
  Address: {
    width: '40px',
    overflowX: 'hidden',
    '@media screen and (min-width: 1024px)': {
      width: 'auto'
    }
  },
  ellipsis: {
    marginLeft: '2px',
    userSelect: 'none',
    '@media screen and (min-width: 1024px)': {
      display: 'none'
    }
  }
});

function Address(props) {
  const algorand = useAlgorand();
  const title = props.title || constants.title;
  const url = (
    `${algorand.explorer}/address/${props.address}`
  );

  return (
    <div className="tags has-addons">
      <span className="tag is-link">{title}</span>
      <span className="tag has-background-white-bis">
        <span className={css(styles.Address)}>
          <a
            className="is-link"
            href={url}
            target="_blank"
          >
            {props.address}
          </a>
        </span>
        <span className={css(styles.ellipsis)}>…</span>
      </span>
    </div>
  );
}

export default Address;