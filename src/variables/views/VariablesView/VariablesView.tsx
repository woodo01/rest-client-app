'use client';

import Spinner from '@/components/ui/spinner';
import PropertyEditor from '@/rest/views/components/PropertyEditor/PropertyEditor';
import useRequestVariables from '@/variables/hooks/useRequestVariables';

function VariablesView(): JSX.Element {
  const { variables, isLoading, setVariables } = useRequestVariables();

  return (
    <div className="mx-auto my-4 max-w-[700px] bg-background shadow-md">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="mb-2 px-1">
          <PropertyEditor
            title="variables"
            onPropertyChange={setVariables}
            items={variables}
            placeholders={{ key: 'variable-key', value: 'variable-value' }}
          />
        </div>
      )}
    </div>
  );
}

export default VariablesView;
