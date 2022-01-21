import React, {useState} from 'react';
import classNames from 'classnames';

import {useDeviceDetect} from '@decentology/hyperverse';

function Signature(props) {
  const device = useDeviceDetect();
  console.log(device);

  const onClose = () => {
    props.onCancel();
  };

  const isWaiting = device.isDesktop;

  let walletURL = 'algorand://';
  if (device.isAppleMobile) {
    walletURL = 'algorand-wc://wc?uri=wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1';
  } else if (device.isMobile) {
    walletURL = 'wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1';
  }

  return (
    <div
      className={classNames({
        'modal': true,
        'is-active': true
      })}
    >
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              Transaction Signature
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              <p>
                Your signature is required to submit this transaction to the blockchain.
              </p>
              {device.isMobile &&
                <p>
                  Please tap <em>sign</em> to be taken to the <strong>Algorand Wallet</strong>.
                </p>
              }
              {device.isDesktop &&
                <p>
                  Please open up your <strong>Algorand Wallet</strong> on your mobile device.
                </p>
              }
            </div>
          </div>
          <footer className="card-footer">
            {!isWaiting &&
              <div className="card-footer-item">
                <button
                  className="button"
                  style={{flexGrow: '1'}}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            }
            <div className="card-footer-item">
              <a
                className={classNames({
                  'button': true,
                  'is-primary': true,
                  'is-loading': isWaiting
                })}
                style={{flexGrow: '1'}}
                href={walletURL}
              >
                Sign
              </a>
            </div>
          </footer>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      />
    </div>
  );
}

export default Signature;