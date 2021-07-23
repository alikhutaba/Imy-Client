import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function MyCustomInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success
    } = props;
    // const { value, setValue } = props.value;

    function handleChange(event) {

        if (props.value !== undefined)
            props.value.setValue(event.target.value)
    }
    const shrink = props.value === undefined ? null : props.value.value === undefined ? null : props.value.value === "" ? null : true

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true
    });
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined
    });
    return (

        < FormControl
            {...formControlProps}
            className={formControlProps.className + " " + classes.formControl}
        >
            { labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + labelClasses}

                    shrink={shrink}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null
            }
            <Input
                value={props.value === undefined ? "" : props.value.value}
                onChange={handleChange}
                classes={{
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses,
                }}
                // input
                // id={id}

                {...inputProps}

            >
            </Input >
            {
                error ? (
                    <Clear className={classes.feedback + " " + classes.labelRootError} />
                ) : success ? (
                    <Check className={classes.feedback + " " + classes.labelRootSuccess} />
                ) : null
            }
        </FormControl >
    );
}

MyCustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool
};
