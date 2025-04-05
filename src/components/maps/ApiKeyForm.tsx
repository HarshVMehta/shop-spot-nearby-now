
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ApiKeyFormProps {
  apiKey: string;
  onSave: (key: string) => void;
  onRemove: () => void;
  onCancel: () => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ apiKey, onSave, onRemove, onCancel }) => {
  const [inputApiKey, setInputApiKey] = useState<string>(apiKey || '');

  const handleSaveApiKey = () => {
    if (onSave(inputApiKey)) {
      onCancel();
      // Reload the page to reinitialize the map with the new API key
      window.location.reload();
    }
  };

  const handleRemoveApiKey = () => {
    onRemove();
    // Reload the page to reflect the change
    window.location.reload();
  };

  return (
    <div className="absolute top-full right-0 mt-2 p-4 bg-white rounded-md shadow-lg z-20 w-72">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Google Maps API Key</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mb-2">Your API key is stored locally on this device.</p>
      <Input
        value={inputApiKey}
        onChange={(e) => setInputApiKey(e.target.value)}
        placeholder="Enter your Google Maps API key"
        className="w-full mb-4"
      />
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleRemoveApiKey}
        >
          Remove Key
        </Button>
        <Button 
          size="sm" 
          className="bg-shopfinder-500 hover:bg-shopfinder-600"
          onClick={handleSaveApiKey}
        >
          Save Key
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyForm;
