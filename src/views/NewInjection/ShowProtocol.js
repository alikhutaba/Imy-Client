import 'date-fns';
import React from "react";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    chip: {
        paddingTop: 20,
        paddingBottom: 10,
    },


};

const useStyles = makeStyles(styles);

export default function ShowProtocol(props) {

    const classes = useStyles();

    const protocol = props.protocol;

    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color={"primary"}>
                        <h3 className={classes.cardTitleWhite}>Protocol: {protocol.name}</h3>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <Table
                                id="Injections"
                                tableHeaderColor="primary"
                                tableHead={["#", "concentration", "dosage"]}
                                clickable={false}
                                colors={protocol.colors}

                                tableData={
                                    protocol.concentration.map((concentration, i) =>
                                        [i, protocol.concentration[i], protocol.dosage[i]]
                                    )
                                }
                            />
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>

    );
}

