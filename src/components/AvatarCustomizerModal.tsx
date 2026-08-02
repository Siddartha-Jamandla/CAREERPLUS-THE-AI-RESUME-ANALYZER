import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Sparkles, 
  Palette, 
  User, 
  Check, 
  Camera, 
  RefreshCw, 
  Image as ImageIcon, 
  Link as LinkIcon,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { fileToBase64 } from '../utils/helpers';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl: string;
  userName: string;
  userEmail: string;
  onSaveAvatar: (newAvatarUrl: string) => void;
}

const COLOR_PALETTES = [
  { name: 'Royal Blue', bg: '2563eb', color: 'ffffff' },
  { name: 'Emerald Green', bg: '059669', color: 'ffffff' },
  { name: 'Deep Purple', bg: '7c3aed', color: 'ffffff' },
  { name: 'Sunset Amber', bg: 'd97706', color: 'ffffff' },
  { name: 'Rose Red', bg: 'e11d48', color: 'ffffff' },
  { name: 'Midnight Dark', bg: '0f172a', color: 'ffffff' },
  { name: 'Electric Cyan', bg: '0891b2', color: 'ffffff' },
  { name: 'Indigo Night', bg: '4338ca', color: 'ffffff' },
  { name: 'Teal Shadow', bg: '0d9488', color: 'ffffff' },
  { name: 'Crimson Slate', bg: '881337', color: 'ffffff' },
];

const PRESET_AVATARS = [
  {
    id: 'preset_1',
    label: 'Executive Leader',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80',
    category: 'Corporate'
  },
  {
    id: 'preset_2',
    label: 'Senior Engineer',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80',
    category: 'Corporate'
  },
  {
    id: 'preset_3',
    label: 'Product Architect',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80',
    category: 'Corporate'
  },
  {
    id: 'preset_4',
    label: 'Tech Director',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&auto=format&fit=crop&q=80',
    category: 'Corporate'
  },
  {
    id: 'preset_5',
    label: 'AI Assistant Bot',
    url: 'https://api.dicebear.com/7.x/bottts/svg?seed=CareerPulseAI&backgroundColor=0f172a',
    category: 'Illustrated'
  },
  {
    id: 'preset_6',
    label: 'Modern Avatar',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ExecutiveCandidate&backgroundColor=b6e3f4',
    category: 'Illustrated'
  },
  {
    id: 'preset_7',
    label: 'Tech Specialist',
    url: 'https://api.dicebear.com/7.x/identicon/svg?seed=TechArchitect2026',
    category: 'Illustrated'
  },
  {
    id: 'preset_8',
    label: 'Geometric Abstract',
    url: 'https://api.dicebear.com/7.x/shapes/svg?seed=CareerPulseShape',
    category: 'Illustrated'
  }
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  userName,
  userEmail,
  onSaveAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'initials' | 'presets' | 'upload' | 'url'>('initials');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatarUrl);
  
  // Custom Initials generator state
  const [initialsName, setInitialsName] = useState<string>(userName || 'Candidate');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES[0]);
  const [isBold, setIsBold] = useState(true);
  const [isRounded, setIsRounded] = useState(true);
  const [customBgHex, setCustomBgHex] = useState('');

  // Uploaded photo state
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [uploadFileName, setUploadFileName] = useState<string>('');

  // Custom URL state
  const [customUrlInput, setCustomUrlInput] = useState<string>('');

  if (!isOpen) return null;

  const generateInitialsAvatar = (bgHex?: string) => {
    const bg = bgHex || selectedColor.bg;
    const boldStr = isBold ? 'true' : 'false';
    const roundedStr = isRounded ? '256' : '0';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initialsName || userEmail)}&background=${bg}&color=${selectedColor.color}&bold=${boldStr}&size=256&rounded=${roundedStr}`;
  };

  const handleSelectPalette = (palette: typeof COLOR_PALETTES[0]) => {
    setSelectedColor(palette);
    const newUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initialsName || userEmail)}&background=${palette.bg}&color=${palette.color}&bold=${isBold ? 'true' : 'false'}&size=256&rounded=${isRounded ? '256' : '0'}`;
    setSelectedAvatar(newUrl);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      setUploadedBase64(base64);
      setUploadFileName(file.name);
      setSelectedAvatar(base64);
    } catch (err) {
      console.error('Error reading avatar image file:', err);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customUrlInput.trim()) {
      setSelectedAvatar(customUrlInput.trim());
    }
  };

  const handleSave = () => {
    onSaveAvatar(selectedAvatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">Avatar Customizer Studio</h3>
              <p className="text-xs text-slate-300">Design your personal photo, initials badge, or illustrated avatar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* LIVE PREVIEW HERO BADGE */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative group shrink-0">
                <img
                  src={selectedAvatar}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-600 shadow-md bg-slate-200"
                  onError={(e) => {
                    // Fallback to default avatar on broken image URL
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2563eb&color=ffffff&bold=true`;
                  }}
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-blue-600 text-white rounded-full shadow-xs">
                  <Sparkles className="w-3 h-3" />
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-600 tracking-wider block">Live Preview</span>
                <h4 className="text-base font-black text-slate-900">{userName || 'Candidate Profile'}</h4>
                <p className="text-xs text-slate-500 font-mono truncate max-w-[200px] sm:max-w-[260px]">{userEmail}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const resetUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || userEmail)}&background=2563eb&color=ffffff&bold=true&size=256`;
                setSelectedAvatar(resetUrl);
                setActiveTab('initials');
              }}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center space-x-1 p-2 rounded-xl border border-slate-200 bg-white shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset to default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* CUSTOMIZATION MODE TABS */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-extrabold">
            <button
              onClick={() => {
                setActiveTab('initials');
                setSelectedAvatar(generateInitialsAvatar());
              }}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'initials' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Initials</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'presets' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Presets</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'upload' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'url' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Image URL</span>
            </button>
          </div>

          {/* TAB 1: INITIALS COLOR & STYLE BUILDER */}
          {activeTab === 'initials' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Display Name / Initials</span>
                  <span className="text-[10px] text-slate-500 font-normal">Auto-generates clean typography badge</span>
                </label>
                <input
                  type="text"
                  value={initialsName}
                  onChange={(e) => {
                    setInitialsName(e.target.value);
                    const newUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.value || userEmail)}&background=${selectedColor.bg}&color=${selectedColor.color}&bold=${isBold ? 'true' : 'false'}&size=256&rounded=${isRounded ? '256' : '0'}`;
                    setSelectedAvatar(newUrl);
                  }}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Enter name for initials..."
                />
              </div>

              {/* Color Swatches Grid */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Select Background Color Theme
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {COLOR_PALETTES.map((palette) => {
                    const isSelected = selectedColor.bg === palette.bg;
                    return (
                      <button
                        key={palette.bg}
                        type="button"
                        onClick={() => handleSelectPalette(palette)}
                        style={{ backgroundColor: `#${palette.bg}` }}
                        className={`h-9 rounded-xl flex items-center justify-center transition-transform cursor-pointer relative ${
                          isSelected ? 'ring-2 ring-blue-600 ring-offset-2 scale-105' : 'hover:scale-105'
                        }`}
                        title={palette.name}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Options */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center space-x-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={isBold}
                    onChange={(e) => {
                      setIsBold(e.target.checked);
                      const newUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initialsName || userEmail)}&background=${selectedColor.bg}&color=${selectedColor.color}&bold=${e.target.checked ? 'true' : 'false'}&size=256&rounded=${isRounded ? '256' : '0'}`;
                      setSelectedAvatar(newUrl);
                    }}
                    className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-800">Bold Typography</span>
                </label>

                <label className="flex items-center space-x-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={isRounded}
                    onChange={(e) => {
                      setIsRounded(e.target.checked);
                      const newUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initialsName || userEmail)}&background=${selectedColor.bg}&color=${selectedColor.color}&bold=${isBold ? 'true' : 'false'}&size=256&rounded=${e.target.checked ? '256' : '0'}`;
                      setSelectedAvatar(newUrl);
                    }}
                    className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-800">Circular Badge</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: PRESET GALLERY */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Curated Executive & Illustrated Avatars
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Click to pick</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_AVATARS.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`p-3 border rounded-2xl flex flex-col items-center space-y-2 text-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/30'
                          : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white"
                      />
                      <div>
                        <span className="text-xs font-extrabold text-slate-900 block truncate">{preset.label}</span>
                        <span className="text-[10px] text-slate-500 block">{preset.category}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/20 rounded-2xl p-8 text-center transition-all relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">
                      <span className="text-blue-600">Click to upload photo</span> or drag & drop image
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </div>
              </div>

              {uploadedBase64 && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-bold">
                  <div className="flex items-center space-x-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Uploaded: {uploadFileName}</span>
                  </div>
                  <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Ready</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CUSTOM IMAGE URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Paste External Image Web URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Apply URL
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ensure the image link is publicly accessible (HTTPS).
                </p>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md flex items-center space-x-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save New Avatar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
