import { SortDirection } from '@/types';
import { FiBriefcase, FiPhone, FiMail, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Company {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  industry?: string;
  status: string;
  address?: string;   // <--- Torne opcional
  website?: string;   // <--- Torne opcional
  contacts?: number;  // <--- Torne opcional
  notes?: string;
}

interface CompanyTableProps {
  companies: Company[];
  getIndustryLabel: (value: string | null | undefined) => string;
  handleEditCompany: (company: Company) => void;
  handleRequestDelete: (company: Company) => void;  // <- adicione esta linha
  sortBy: keyof Company;
  sortDirection: SortDirection;
  onSortChange: (columnKey: keyof Company) => void;
}

export default function CompanyTable({
  companies,
  getIndustryLabel,
  handleEditCompany,
  handleRequestDelete,
}: CompanyTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Empresa
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contato
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Setor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contatos
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map(company => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FiBriefcase />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.website}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <FiPhone className="mr-1 text-gray-400" />
                    {company.phone}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiMail className="mr-1 text-gray-400" />
                    {company.email}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getIndustryLabel(company.industry)}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : company.status === 'inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : company.status === 'partner'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {company.status === 'active'
                      ? 'Ativa'
                      : company.status === 'inactive'
                      ? 'Inativa'
                      : company.status === 'partner'
                      ? 'Parceira'
                      : 'Patrocinadora'}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {company.contacts} contato{company.contacts !== 1 ? 's' : ''}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCompany(company)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    aria-label={`Editar ${company.name}`}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleRequestDelete(company)}
                    className="text-red-600 hover:text-red-900"
                    aria-label={`Excluir ${company.name}`}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
