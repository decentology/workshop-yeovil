import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

import useAlgorand from "../../useAlgorand";

const styles = StyleSheet.create({
  Transactions: {
    marginBottom: "1.5rem",
  },
  Transaction: {
    width: "200px",
    overflowX: "hidden",
    "@media screen and (min-width: 1024px)": {
      width: "auto",
    },
  },
  ellipsis: {
    marginLeft: "2px",
    userSelect: "none",
    "@media screen and (min-width: 1024px)": {
      display: "none",
    },
  },
});

function Transactions(props) {
  const algorand = useAlgorand();

  const { pendingTransactions, completedTransactions } = algorand.state;

  if (pendingTransactions.length === 0 && completedTransactions.length === 0) {
    return (
      <div>
        <h4 className="title is-4">Transactions</h4>
        <p>No pending transactions...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h4 className="title is-4">Transactions</h4>
        <div className={css(styles.Transactions)}>
          {pendingTransactions.map((transaction) => {
            return (
              <div key={transaction.ID} className="tags has-addons">
                <span className="tag is-warning">pending</span>
                <span className="tag has-background-white-bis">
                  <span className={css(styles.Transaction)}>{transaction}</span>
                  <span className={css(styles.ellipsis)}>…</span>
                </span>
              </div>
            );
          })}
        </div>
        <div className={css(styles.Transactions)}>
          {completedTransactions.map((transaction) => {
            return (
              <div key={transaction.ID} className="tags has-addons">
                <span className="tag is-success">completed</span>
                <span className="tag has-background-white-bis">
                  <span className={css(styles.Transaction)}>
                    <a
                      className="is-link"
                      href={`${algorand.explorer}/tx/${transaction.ID}`}
                      target="_blank"
                    >
                      {transaction.ID}
                    </a>
                  </span>
                  <span className={css(styles.ellipsis)}>…</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Transactions;
