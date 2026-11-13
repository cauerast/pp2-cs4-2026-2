import { useState, useEffect } from 'react';
import type { Car } from '../types/Car';
import type { Customer } from '../types/Customer';
import { Link } from 'react-router';

export function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function fetchData() {
    const apiHost = import.meta.env.VITE_API_BASE;

    try {
      const [carsResponse, customersResponse] = await Promise.all([
        fetch(`${apiHost}/cars`),
        fetch(`${apiHost}/customers`),
      ]);

      if (!carsResponse.ok) {
        throw new Error(`Erro HTTP ao buscar carros: ${carsResponse.status}`);
      }
      if (!customersResponse.ok) {
        throw new Error(
          `Erro HTTP ao buscar clientes: ${customersResponse.status}`
        );
      }

      const carsData: Car[] = await carsResponse.json();
      const customersData: Customer[] = await customersResponse.json();

      setCars(carsData);
      setCustomers(customersData);
    } catch (error) {
      if (error instanceof Error) {
        window.alert('ERRO: ' + error.message);
      }
    }
  }

  useEffect(() => void fetchData(), []);

  function getCustomerName(customerId?: number | null) {
    if (!customerId) return 'Sem comprador';
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : 'Cliente não encontrado';
  }

  return (
    <>
      <h2 className="h2 mb-3">Listagem de Carros</h2>

      <p className="text-secondary">Total de carros: {cars.length}</p>

      <div className="text-end mb-3">
        <Link to={`/cars/new`} className="btn btn-outline-primary">
          Novo carro
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Cor</th>
              <th scope="col">Ano de Fabricação</th>
              <th scope="col">Importado</th>
              <th scope="col">Placas</th>
              <th scope="col">Data da venda</th>
              <th scope="col">Preço da venda</th>
              <th scope="col">Cliente</th>
              <th scope="col" className="text-end">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.year_manufacture}</td>
                <td>{car.imported ? 'Sim' : 'Não'}</td>
                <td>{car.plates}</td>
                <td>
                  {car.selling_date
                    ? new Date(car.selling_date).toLocaleDateString('pt-BR', {
                        timeZone: 'UTC',
                      })
                    : '-'}
                </td>
                <td>
                  {car.selling_price !== null && car.selling_price !== undefined
                    ? Number(car.selling_price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    : '-'}
                </td>
                <td>{getCustomerName(car.customer_id)}</td>
                <td className="text-end">
                  <Link
                    to={`/cars/${car.id}`}
                    className="btn btn-outline-primary"
                    aria-label={`Editar carro ${car.brand} ${car.model}`}
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}

            {cars.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center text-secondary">
                  Nenhum carro cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
