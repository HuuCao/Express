import axios from 'axios';
const uploadFile = async (file) => {
  const fd = new FormData();
  const configs = { headers: { 'Content-Type': 'multipart/form-data' } };
  fd.append('file', file);
  fd.append('upload_preset', 'viesoftware');
  const res = await axios.post(
    'https://api.cloudinary.com/v1_1/dnrxsjo5r/image/upload',
    fd,
    configs
  );
  if (res.status == 200) {
    return res.data.secure_url;
  } else return '';
};
export default uploadFile;
