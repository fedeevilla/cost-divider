export const ADD_PARTICIPANT = "ADD_PARTICIPANT";
export const DELETE_PARTICIPANT = "DELETE_PARTICIPANT";

export const addParticipant = (participant) => (dispatch) => {
  dispatch({
    type: ADD_PARTICIPANT,
    payload: participant,
  });
};

export const deleteParticipant = (name) => (dispatch) => {
  dispatch({
    type: DELETE_PARTICIPANT,
    payload: name,
  });
};

export const splitPayments = () => (dispatch, getState) => {
  let payments = {};

  for (let k = 0; k < getState().participants.list.length; k++) {
    payments[getState().participants.list[k].name] = parseFloat(
      getState().participants.list[k].amount
    );
  }

  const people = Object.keys(payments);
  const valuesPaid = Object.values(payments);

  const sum = valuesPaid.reduce((acc, curr) => curr + acc);
  const mean = sum / people.length;

  const sortedPeople = people.sort(
    (personA, personB) => payments[personA] - payments[personB]
  );
  const sortedValuesPaid = sortedPeople.map(
    (person) => payments[person] - mean
  );

  let i = 0;
  let j = sortedPeople.length - 1;
  let debt;

  let aux = [];

  while (i < j) {
    debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
    sortedValuesPaid[i] += debt;
    sortedValuesPaid[j] -= debt;

    aux.push({
      p1: sortedPeople[i],
      p2: sortedPeople[j],
      amount: debt.toFixed(2),
    });

    if (sortedValuesPaid[i] === 0) {
      i++;
    }

    if (sortedValuesPaid[j] === 0) {
      j--;
    }
  }

  return aux;
};
