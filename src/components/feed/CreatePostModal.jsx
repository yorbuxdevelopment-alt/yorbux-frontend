import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  ChevronDown,
  Check,
  Globe,
  Users,
  Image as ImageIcon,
  Smile,
  Video,
  Send,
  Radio,
  Camera,
  RefreshCw,
  Square
} from 'lucide-react';
import { getMyProfile } from '../../services/profile';
import { createPost, getConnections } from '../../services/posts';

const visibilityOptions = {
  PUBLIC: { icon: <Globe size={16} />, text: 'Public' },
  MY_CONNECTIONS: { icon: <Users size={16} />, text: 'Friends' },
  SPECIFIC_CONNECTIONS: { icon: <Check size={16} />, text: 'Specific Connections' }
};

const feelingOptions = [
  { key: 'happy', label: 'Happy', emoji: '😊' },
  { key: 'excited', label: 'Excited', emoji: '🤩' },
  { key: 'grateful', label: 'Grateful', emoji: '🙏' },
  { key: 'motivated', label: 'Motivated', emoji: '🔥' },
  { key: 'proud', label: 'Proud', emoji: '💪' },
  { key: 'blessed', label: 'Blessed', emoji: '✨' },
  { key: 'curious', label: 'Curious', emoji: '🤔' },
  { key: 'celebrating', label: 'Celebrating', emoji: '🥳' }
];

const DEFAULT_PICKER_ACCEPT = 'image/*,video/*,application/pdf';

const CreatePostModal = ({
  isOpen,
  onClose,
  onPostCreated,
  currentUserProfile = null,
  initialAction = 'default'
}) => {
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('MY_CONNECTIONS');
  const [specificConnections, setSpecificConnections] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [profile, setProfile] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeelingPickerOpen, setIsFeelingPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingContext, setLoadingContext] = useState(false);
  const [error, setError] = useState('');
  const [pickerAccept, setPickerAccept] = useState(DEFAULT_PICKER_ACCEPT);
  const [liveMode, setLiveMode] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('user');
  const [cameraError, setCameraError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const stopCameraStream = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    recordedChunksRef.current = [];
    setIsRecording(false);

    if (videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = null;
    }
  };

  const startCameraStream = async (facingMode = cameraFacingMode) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not supported in this browser.');
      return;
    }

    try {
      stopCameraStream();
      setCameraError('');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true
      });

      mediaStreamRef.current = stream;

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
      }
    } catch (requestError) {
      setCameraError(requestError.message || 'Camera access nahi mil paaya.');
      setLiveMode(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCameraStream();
      return undefined;
    }

    let active = true;
    setLoadingContext(true);
    setError('');

    Promise.all([
      currentUserProfile ? Promise.resolve(currentUserProfile) : getMyProfile().catch(() => null),
      getConnections().catch(() => [])
    ])
      .then(([profileData, connectionsData]) => {
        if (!active) return;
        setProfile(profileData);
        setConnections(connectionsData);
      })
      .catch(() => {
        if (!active) return;
        setError('Post composer load nahi ho paaya');
      })
      .finally(() => {
        if (active) {
          setLoadingContext(false);
        }
      });

    return () => {
      active = false;
      stopCameraStream();
    };
  }, [currentUserProfile, isOpen]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!isOpen) return;

    if (initialAction === 'photo') {
      setPickerAccept(DEFAULT_PICKER_ACCEPT);
      window.setTimeout(() => fileInputRef.current?.click(), 0);
    } else if (initialAction === 'live') {
      setLiveMode(true);
    } else if (initialAction === 'feeling') {
      setIsFeelingPickerOpen(true);
    }
  }, [initialAction, isOpen]);

  useEffect(() => {
    if (!liveMode || !isOpen) {
      stopCameraStream();
      return;
    }

    startCameraStream(cameraFacingMode);
  }, [cameraFacingMode, isOpen, liveMode]);

  const displayName = profile?.user?.fullname || profile?.user?.name || 'YorBux User';
  const avatar = profile?.user?.profileImage || 'https://i.pravatar.cc/48?u=yorbux-user';
  const isLivePost = liveMode && selectedFile?.type?.startsWith('video/');

  const selectedConnectionNames = useMemo(
    () =>
      connections
        .filter((connection) => specificConnections.includes(connection.id))
        .map((connection) => connection.name),
    [connections, specificConnections]
  );

  const resetState = () => {
    stopCameraStream();
    setContent('');
    setVisibility('MY_CONNECTIONS');
    setSpecificConnections([]);
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedFeeling(null);
    setError('');
    setIsDropdownOpen(false);
    setIsFeelingPickerOpen(false);
    setPickerAccept(DEFAULT_PICKER_ACCEPT);
    setLiveMode(false);
    setCameraFacingMode('user');
    setCameraError('');
  };

  const handleClose = () => {
    if (loading) return;
    resetState();
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setLiveMode(false);
    stopCameraStream();
  };

  const handleToggleConnection = (connectionId) => {
    setSpecificConnections((current) =>
      current.includes(connectionId)
        ? current.filter((id) => id !== connectionId)
        : [...current, connectionId]
    );
  };

  const handleOpenPicker = (mode) => {
    stopCameraStream();
    setLiveMode(false);
    setPickerAccept(mode === 'live' ? 'video/*' : DEFAULT_PICKER_ACCEPT);
    fileInputRef.current?.click();
  };

  const handleStartLive = async () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setLiveMode(true);
  };

  const handleSwitchCamera = () => {
    setCameraFacingMode((current) => (current === 'user' ? 'environment' : 'user'));
  };

  const handleStartRecording = () => {
    const stream = mediaStreamRef.current;
    if (!stream) {
      setCameraError('Camera preview start hone ke baad recording karo.');
      return;
    }

    try {
      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const liveFile = new File([blob], `yorbux-live-${Date.now()}.webm`, { type: 'video/webm' });
        setSelectedFile(liveFile);
      };

      recorder.start();
      setIsRecording(true);
    } catch (requestError) {
      setCameraError(requestError.message || 'Recording start nahi ho paayi.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedFile) {
      setError('Post content ya media required hai');
      return;
    }

    if (visibility === 'SPECIFIC_CONNECTIONS' && !specificConnections.length) {
      setError('Specific connections select karo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await createPost({
        content,
        publishType: visibility,
        specificConnections,
        mediaFile: selectedFile,
        isLive: isLivePost,
        feeling: selectedFeeling
      });

      if (response.post) {
        onPostCreated?.(response.post);
      }

      window.dispatchEvent(new Event('feed:refresh'));
      handleClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Post create nahi ho paaya');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-bg-surface rounded-xl shadow-2xl w-full max-w-lg border border-border-ui max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-ui">
          <h3 className="font-bold text-lg text-text-main">Create a post</h3>
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((current) => !current)}
                className="bg-bg-page text-text-sec text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <span>Visible for: {visibilityOptions[visibility].text}</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen ? (
                <div className="absolute top-full right-0 mt-2 w-64 bg-bg-card border border-border-ui rounded-lg shadow-xl z-10">
                  {Object.entries(visibilityOptions).map(([key, option]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setVisibility(key);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-bg-page text-left"
                    >
                      <div className="flex items-center gap-2 text-text-main">
                        {option.icon}
                        <span className="text-sm font-medium">{option.text}</span>
                      </div>
                      {visibility === key ? <Check size={18} className="text-action-blue" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="text-text-sec hover:text-red-500 bg-bg-page p-1.5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          ) : null}

          <div className="flex items-start gap-4">
            <img src={avatar} alt={displayName} className="w-12 h-12 rounded-full border border-border-ui/20 object-cover" />
            <div className="w-full">
              {selectedFeeling ? (
                <div className="mb-2 text-sm font-medium text-text-main">
                  is feeling {selectedFeeling.emoji} {selectedFeeling.label}
                </div>
              ) : null}
              {isLivePost ? (
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  <Radio size={14} />
                  Live video post ready
                </div>
              ) : null}
              <textarea
                className="w-full p-2 bg-transparent text-text-main placeholder-text-sec rounded-lg focus:outline-none resize-none text-lg"
                rows="4"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="What's happening?"
              />
            </div>
          </div>

          {isFeelingPickerOpen ? (
            <div className="rounded-xl border border-border-ui bg-bg-page/50 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text-main">How are you feeling?</p>
                <button
                  type="button"
                  onClick={() => setSelectedFeeling(null)}
                  className="text-xs font-medium text-text-sec hover:text-action-blue"
                >
                  Clear
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {feelingOptions.map((feeling) => {
                  const active = selectedFeeling?.key === feeling.key;

                  return (
                    <button
                      key={feeling.key}
                      type="button"
                      onClick={() => {
                        setSelectedFeeling(feeling);
                        setIsFeelingPickerOpen(false);
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium ${
                        active ? 'border-action-blue bg-action-blue/5 text-action-blue' : 'border-border-ui bg-bg-surface text-text-main'
                      }`}
                    >
                      <div className="text-lg">{feeling.emoji}</div>
                      <div className="mt-1">{feeling.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {visibility === 'SPECIFIC_CONNECTIONS' ? (
            <div className="rounded-xl border border-border-ui bg-bg-page/50 p-3">
              <p className="text-sm font-semibold text-text-main">Choose connections</p>
              <div className="mt-3 max-h-44 overflow-y-auto space-y-2">
                {loadingContext ? (
                  <p className="text-sm text-text-sec">Connections loading...</p>
                ) : connections.length ? (
                  connections.map((connection) => {
                    const selected = specificConnections.includes(connection.id);

                    return (
                      <button
                        key={connection.id}
                        type="button"
                        onClick={() => handleToggleConnection(connection.id)}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2 border text-left ${
                          selected ? 'border-action-blue bg-action-blue/5' : 'border-border-ui bg-bg-surface'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={connection.avatar} alt={connection.name} className="w-9 h-9 rounded-full object-cover" />
                          <span className="text-sm font-medium text-text-main">{connection.name}</span>
                        </div>
                        {selected ? <Check size={16} className="text-action-blue" /> : null}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-sm text-text-sec">No active connections found.</p>
                )}
              </div>

              {selectedConnectionNames.length ? (
                <p className="mt-3 text-xs text-text-sec">
                  Selected: {selectedConnectionNames.join(', ')}
                </p>
              ) : null}
            </div>
          ) : null}

          {liveMode ? (
            <div className="rounded-xl border border-border-ui bg-bg-page p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                  <Radio size={14} />
                  Camera live mode
                </div>
                <button
                  type="button"
                  onClick={handleSwitchCamera}
                  className="inline-flex items-center gap-2 rounded-lg border border-border-ui px-3 py-2 text-xs font-medium text-text-sec hover:text-action-blue"
                >
                  <RefreshCw size={14} />
                  Switch camera
                </button>
              </div>

              {cameraError ? <p className="text-sm text-red-500">{cameraError}</p> : null}

              <div className="overflow-hidden rounded-xl bg-black">
                <video ref={videoPreviewRef} autoPlay muted playsInline className="h-72 w-full object-cover" />
              </div>

              <div className="flex flex-wrap gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                  >
                    <Camera size={16} />
                    Start recording
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white"
                  >
                    <Square size={16} />
                    Stop recording
                  </button>
                )}

                {selectedFile ? (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    Recorded clip ready
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {previewUrl ? (
            <div className="relative">
              <div className="max-h-72 rounded-lg overflow-hidden border border-border-ui bg-bg-page">
                {selectedFile?.type === 'application/pdf' ? (
                  <div className="flex items-center gap-3 px-4 py-5 text-text-main">
                    <ImageIcon size={20} className="text-action-blue" />
                    <div>
                      <p className="text-sm font-semibold">PDF selected</p>
                      <p className="text-xs text-text-sec">{selectedFile.name}</p>
                    </div>
                  </div>
                ) : selectedFile?.type?.startsWith('video/') ? (
                  <video src={previewUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPickerAccept(DEFAULT_PICKER_ACCEPT);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70"
              >
                <X size={18} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-center p-4 border-t border-border-ui">
          <div className="flex gap-4 sm:gap-6">
            <button
              type="button"
              onClick={handleStartLive}
              className="flex items-center gap-2 text-text-sec hover:text-action-blue"
            >
              <Video size={20} />
              <span className="font-medium text-sm">Live Video</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={pickerAccept}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => handleOpenPicker('photo')}
              className="flex items-center gap-2 text-text-sec hover:text-action-blue"
            >
              <ImageIcon size={20} />
              <span className="font-medium text-sm">Photo/Video</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFeelingPickerOpen((current) => !current)}
              className="flex items-center gap-2 text-text-sec hover:text-action-blue"
            >
              <Smile size={20} />
              <span className="font-medium text-sm">Feeling</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || isRecording}
            className="inline-flex items-center gap-2 bg-action-blue text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-90 shadow-lg shadow-action-blue/20 disabled:opacity-70"
          >
            {loading ? 'Posting...' : (
              <>
                <Send size={16} />
                Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
