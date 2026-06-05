import { Save, X } from 'lucide-react';

const Form = ({ fields, onSubmit, onCancel, initialData = {} }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name);
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccione...</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              required={field.required}
              rows={field.rows || 3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : field.type === 'date' ? (
            <input
              type="date"
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : field.type === 'number' ? (
            <input
              type="number"
              name={field.name}
              step={field.step || '0.01'}
              defaultValue={initialData[field.name] || ''}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      ))}
      
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
        )}
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="w-4 h-4" />
          <span>Guardar</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
