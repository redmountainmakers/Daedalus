import React from 'react';
import { connect } from 'react-redux';

import Gridicon from '../vendor/gridicon';
import SectionBody from './SectionBody';
import {
	isControllerConnected,
} from './selectors/controller';

import './ControllerStatus.scss';

function ControllerStatus({ requesting, isConnected, error }) {
	if (requesting) {
		return (
			<SectionBody className="ControllerStatus loading">
				<Gridicon icon="plugins" size={ 24 } />
				<div className="content">
					Connecting to controller...
				</div>
			</SectionBody>
		);
	}

	if (isConnected) {
		return (
			<SectionBody className="ControllerStatus success">
				<Gridicon icon="plugins" size={ 24 } />
				<div className="content">
					Connected to controller
				</div>
			</SectionBody>
		);
	}

	let errorText = 'Read-only mode: Cannot connect to controller';
	if (error && error !== 'Unknown error') {
		errorText += `: ${ error }`;
	}

	if (error) {
		return (
			<SectionBody className="ControllerStatus error">
				<Gridicon icon="plugins" size={ 24 } />
				<div className="content">
					<div className="line">
						{ errorText }
					</div>
					<div className="line">
						Make sure you are connected to the RMM wifi network and
						the kiln controller is plugged in.
					</div>
				</div>
			</SectionBody>
		);
	}

	// It's possible to get here while debugging and replaying state history
	return (
		<SectionBody className="ControllerStatus error">
			<Gridicon icon="notice-outline" size={ 24 } />
			<div className="content">
				You should never see this.  Maybe you did something weird?
			</div>
		</SectionBody>
	);
}

ControllerStatus.propTypes = {
	requesting  : React.PropTypes.bool,
	isConnected : React.PropTypes.bool,
	error       : React.PropTypes.string,
};

export default connect(
	(state, props) => {
		const requesting  = state.controller.requesting;
		const isConnected = isControllerConnected(state);
		const error       = state.errors.controllerStatus;

		return {
			requesting,
			isConnected,
			error,
		};
	}
)(ControllerStatus);
