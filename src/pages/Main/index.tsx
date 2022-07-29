import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { CarTable, FilterContainer, SiteContainer, TableContainer, TableTitle } from './styles';
import Pagination from '../../components/Pagination';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IcarList {
  nome: string;
  codigo: string;
}

const Main: React.FC = () => {

  // mostra todos os carros existentes 
  const [carList, setCarList] = useState<IcarList[]>([]);

  // mostra a página atual
  const [currentPage, setCurrentPage] = useState<number>(0);

  // utilizo para criar um novo carro
  const [newcarList, setNewcarList] = useState<IcarList>({ nome: '', codigo: '' })


  // utilizo para filtrar os carros atuais
  const [currentFilter, setCurrentFilter] = useState<IcarList>({ nome: '', codigo: '' });

  // utilizo para saber quantos carros estão disponíveis no atual filtro
  const [shownCars, setShownCars] = useState<number>(carList.length);

  // fazendo o request
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          'https://parallelum.com.br/fipe/api/v1/carros/marcas'
        );
        setCarList(response.data);
      }
      catch (e) {
        console.error("Falha ao fazer o request! Erro:", e)
      }
    }
    getData();
  }, []);


  // definindo para o shownCars sempre ser definnido a partir dos filtros
  useEffect(() => {
    setShownCars(
      carList
        ?.filter(car =>
          car.nome.toLowerCase().includes(currentFilter.nome.toLowerCase())
        )
        .filter(car => car.codigo.includes(currentFilter.codigo)).length
    );
  }, [carList, currentFilter.codigo, currentFilter.nome]);


  // callback para adicionar um carro novo a lista atual 
  const addCar = useCallback((newData: { nome: string; codigo: string; }) => {
    if (!carList.find(car => car.nome.toLowerCase() === newData.nome.toLowerCase()) && !carList.find(car => car.codigo === newData.codigo)) {
      setCarList(oldcarList => [...oldcarList, { nome: newData.nome, codigo: newData.codigo }])
    }
    else {
      toast.error('Já existe um carro cadastrado com esses dados!')
    }
  }, [carList])

  // quantos carros aparecerão por vez
  const listSize = useMemo<number>(() => { return 15; }, []);


  // tentei fazer essas duas funções da maneira mais escalável possível

  const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event?.target?.value ?? ""
      const id = event?.target?.id ?? ""

      if (!id) {
        throw new Error("Not id in element handle");
      }

      setCurrentFilter((prev) => ({
        nome: id === "nome" ? value : prev.nome,
        codigo: id === "codigo" ? value : prev.codigo,
      }));
    } catch (error) {
      alert(error)
    }
  }, []);

  const handleNewCar = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = event?.target?.value ?? ""
      const id = event?.target?.id ?? ""

      if (!id) {
        throw new Error("Not id in element handle");
      }

      setNewcarList((prev) => ({
        nome: id === "nomeCarro" ? value : prev.nome,
        codigo: id === "codigoCarro" ? value : prev.codigo,
      }));
    } catch (error) {
      alert(error)
    }
  }, []);



  return (
    <SiteContainer>
      <Pagination
        currentPage={currentPage}
        totalCountOfRegisters={shownCars}
        onPageChange={setCurrentPage}
        registersPerPage={listSize}
      />
      <div>
        <FilterContainer>

          <div className='FilterWrapper'>
            <th>Filtrar</th>

            <div className='InputContainer'>
              <div>
                <p>Nome</p>
                <input
                  id={"nome"}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <p>Código</p>
                <input
                  id={"codigo"}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

          </div>
          <div className='FilterWrapper'>
            <th>Novo Carro</th>
            <div className='InputContainer'>

              <div>
                <p>Nome</p>
                <input id="nomeCarro" onChange={handleNewCar}></input>
              </div>
              <div>
                <p>Codigo</p>
                <input id="codigoCarro" onChange={handleNewCar}></input>
              </div>
            </div>
            <button type="button" onClick={() => addCar(newcarList)}>Adicionar</button>
          </div>
        </FilterContainer>

        <div>
          <TableTitle>
            <p><strong>Nome</strong></p>
            <p><strong>Codigo</strong></p>
          </TableTitle>
          <TableContainer>
            {carList
              ?.filter(car =>
                car.nome.toLowerCase().includes(currentFilter.nome.toLowerCase())
              )
              .filter(car => car.codigo.includes(currentFilter.codigo))
              .slice(currentPage * listSize, currentPage * listSize + listSize)
              .map(car => (
                <CarTable key={car?.codigo}>
                  <p>{car?.nome}</p>
                  <p>{car?.codigo}</p>
                </CarTable>
              ))}
          </TableContainer>
        </div>
      </div >
    </SiteContainer >
  );
};

export default Main;
