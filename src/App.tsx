import { useEffect, useState } from 'react';
import axios from 'axios';
import { CarTable, FilterContainer, PageFooter, SiteContainer, TableContainer, TableTitle } from './styles';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { Pagination } from './components/Pagination';


const App = () => {
  interface ICarData {
    nome: string;
    codigo: string;
  }

  const [carData, setCarData] = useState<ICarData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [newCarName, setNewCarName] = useState<string>('')
  const [newCarCode, setNewCarCode] = useState<string>('')

  const [currentNameFilter, setCurrentNameFilter] = useState<string>('');

  const [currentCodeFilter, setCurrentCodeFilter] = useState<string>('');

  const [shownCars, setShownCars] = useState<number>(carData.length);

  console.log(shownCars)

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        'https://parallelum.com.br/fipe/api/v1/carros/marcas'
      );
      setCarData(response.data);
    }
    getData();
  }, []);

  useEffect(() => {
    setShownCars(
      carData
        ?.filter(car =>
          car.nome.toLowerCase().includes(currentNameFilter.toLowerCase())
        )
        .filter(car => car.codigo.includes(currentCodeFilter)).length
    );
  }, [carData, currentCodeFilter, currentNameFilter]);

  function nextPage() {
    if (currentPage >= 0 && currentPage * 15 + 15 < shownCars) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage - 1 <= shownCars / 15 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function addCar(newName: string, newCode: string) {
    if (!carData.find(car => car.nome === newName) && !carData.find(car => car.codigo === newCode)) {
      setCarData(oldCarData => [...oldCarData, { nome: newName, codigo: newCode }])
    }
  }


  return (
    <SiteContainer>
      <Pagination
        currentPage={currentPage}
        totalCountOfRegisters={shownCars}
        onPageChange={setCurrentPage}
      />
      <div>
        <FilterContainer>

          <div className='FilterWrapper'>
            <th>Filtrar</th>

            <div className='InputContainer'>
              <div>
                <p>Nome</p>
                <input
                  onChange={filter => {
                    setCurrentNameFilter(filter.target.value);
                    setCurrentPage(0)
                  }}
                />
              </div>
              <div>
                <p>Código</p>
                <input
                  onChange={filter => {
                    setCurrentCodeFilter(filter.target.value);
                    setCurrentPage(0)
                  }}
                />
              </div>
            </div>

          </div>
          <div className='FilterWrapper'>
            <th>Novo Carro</th>
            <div className='InputContainer'>

              <div>
                <p>Nome</p>
                <input onChange={newName => setNewCarName(newName.target.value)}></input>
              </div>
              <div>
                <p>Codigo</p>
                <input onChange={newCode => setNewCarCode(newCode.target.value)}></input>
              </div>
            </div>
            <button type="button" onClick={() => addCar(newCarName, newCarCode)}>Adicionar</button>
          </div>
        </FilterContainer>

        <div>
          <TableTitle>
            <p><strong>Nome</strong></p>
            <p><strong>Codigo</strong></p>
          </TableTitle>
          <TableContainer>
            {carData
              ?.filter(car =>
                car.nome.toLowerCase().includes(currentNameFilter.toLowerCase())
              )
              .filter(car => car.codigo.includes(currentCodeFilter))
              .slice(currentPage * 15, currentPage * 15 + 15)
              .map(car => (
                <CarTable key={car?.codigo}>
                  <p>{car?.nome}</p>
                  <p>{car?.codigo}</p>
                </CarTable>
              ))}
          </TableContainer>
        </div>
      </div>
    </SiteContainer>
  );
};

export default App;
