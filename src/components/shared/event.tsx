import React from "react";
import { EventTypes } from "types";
import { styled } from "styled-components";

interface EventProps {
	event: EventTypes;
}
const Wrapper = styled.div`
 
 @media (max-width: 768px) {
    max-width: 300px;
  }
  &, & .event {

	  &_year {
		  color: #3877ee;
		  font-weight: 400;
		  font-size: 25px;
		  line-height: 120%;
		  text-transform: uppercase;
		  margin-bottom: 15px;
		}
		&_description {
			font-weight: 400;
			font-size: 20px;
			line-height: 30px;
			color: #42567a;
		}
    }

`
const Event = ({ event }: EventProps): JSX.Element => {
	return (
		<Wrapper className={"event"}>
			<div className={"event_year"}>{event.year}</div>
			<div className={"event_description"}>{event.description}</div>
		</Wrapper>
	);
};

export default Event;
