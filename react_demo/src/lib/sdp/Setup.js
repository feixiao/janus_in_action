import Enum from "./Enum";
/**
 * Enum for Setup values.
 * @readonly
 * @enum {number}
 */
const Setup = Enum("ACTIVE","PASSIVE","ACTPASS","INACTIVE");

/**
 * Get Setup by name
 * @memberOf Setup
 * @param {string} setup
 * @returns {Setup}
 */
Setup.byValue = function(setup)
{
	//Check if it is already a symbol
	switch(setup)
	{
		case Setup.ACTIVE:
		case Setup.PASSIVE:
		case Setup.ACTPASS:
		case Setup.INACTIVE:
			return setup;
	}
	//Convert from string
	return Setup[setup.toUpperCase()];
};

/**
 * Get Setup name
 * @memberOf Setup
 * @param {Setup} setup
 * @returns {String}
 */
Setup.toString = function(setup)
{
	switch(setup)
	{
		case Setup.ACTIVE:
			return "active";
		case Setup.PASSIVE:
			return "passive";
		case Setup.ACTPASS:
			return "actpass";
		case Setup.INACTIVE:
			return "inactive";
	}
};

/**
 * Get reverse Setup
 * @memberOf Setup
 * @param {Setup} setup
 * @returns {Setup}
 */
Setup.reverse = function(setup)
{
	switch(setup)
	{
		case Setup.ACTIVE:
			return Setup.PASSIVE;
		case Setup.PASSIVE:
			return Setup.ACTIVE;
		case Setup.ACTPASS:
			return Setup.PASSIVE;
		case Setup.INACTIVE:
			return Setup.INACTIVE;
	}
};

export default Setup;