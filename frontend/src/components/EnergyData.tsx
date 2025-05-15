import { useQuery } from '@apollo/client';
import { GET_ENERGY_BY_DATE_RANGE } from '../graphql/queries';

export const EnergyData = () => {
    const { loading, error, data } = useQuery(GET_ENERGY_BY_DATE_RANGE, {
        variables: {
            startDate: '2025-05-12T00:00:00Z',
            endDate: '2025-05-14T23:59:59Z'
        }
    });

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Datos de Balance Energético</h2>
            <table>
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Generación</th>
                    <th>Demanda</th>
                </tr>
                </thead>
                <tbody>
                {data.getEnergyByDateRange.map((entry: any) => (
                    <tr key={entry.datetime}>
                        <td>{new Date(entry.datetime).toLocaleString()}</td>
                        <td>{entry.generation}</td>
                        <td>{entry.demand}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
