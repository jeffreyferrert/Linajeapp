import React, { useContext } from 'react';

const DataContext = React.createContext();
export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [forms, setForms] = React.useState([...TestData]);

  const createForm = (form) => {
    setForms([...forms, form]);
  };

  const updateForm = (index, updatedForm) => {
    const newForms = forms.map((form, i) => (i === index ? updatedForm : form));
    setForms(newForms);
  };

  return (
    <DataContext.Provider value={{ forms, createForm, updateForm }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

const TestData = [
  {
    id: 1,
    father: 'R2D201',
    mother: 'R2D202',
    birthday: '2021-01-01',
    plaque: 'ACM1PT001',
    sex: 'Macho',
    linaje: {
      Criollo: 0.5,
      McRae: 0.25,
      Albany: 0.25,
    },
    status: 'Vivo',
  },
  {
    id: 2,
    father: 'R2D201',
    mother: 'R2D202',
    birthday: '2021-01-01',
    plaque: 'ACM1PT002',
    sex: 'Macho',
    linaje: {
      Criollo: 0.5,
      McRae: 0.25,
      Albany: 0.25,
    },
    status: 'Vivo',
  },
  {
    id: 3,
    father: 'R2D201',
    mother: 'R2D202',
    birthday: '2021-01-01',
    plaque: 'ACM1PT003',
    sex: 'Hembra',
    linaje: {
      Criollo: 0.5,
      McRae: 0.25,
      Albany: 0.25,
    },
    status: 'Vivo',
  },
  {
    id: 4,
    father: 'R2D201',
    mother: 'R2D202',
    birthday: '2021-01-01',
    plaque: 'ACM1PT004',
    sex: 'Hembra',
    linaje: {
      Criollo: 0.5,
      McRae: 0.25,
      Albany: 0.25,
    },
    status: 'Muerto',
  },
  {
    id: 5,
    father: 'L2Q945',
    mother: 'L2Q872',
    birthday: '2021-01-04',
    plaque: 'ACM1PT005',
    sex: 'Macho',
    linaje: {
      Hatch: 0.5,
      Albany: 0.5,
    },
    status: 'Vivo',
  },
  {
    id: 6,
    father: 'L2Q945',
    mother: 'L2Q872',
    birthday: '2021-01-04',
    plaque: 'ACM1PT006',
    linaje: {
      Hatch: 0.5,
      Albany: 0.5,
    },
    status: 'Muerto',
  },
  {
    id: 7,
    father: 'L2Q945',
    mother: 'L2Q872',
    birthday: '2021-01-04',
    plaque: 'ACM1PT007',
    linaje: {
      Hatch: 0.5,
      Albany: 0.5,
    },
    status: 'Vivo',
  },
  {
    id: 8,
    father: 'L2Q945',
    mother: 'L2Q872',
    birthday: '2021-01-04',
    plaque: 'ACM1PT008',
    linaje: {
      Hatch: 0.5,
      Albany: 0.5,
    },
    status: 'Vivo',
  },
];
