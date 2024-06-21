import { useSetting } from '../../context/SettingContext';
import Button from '../../ui/Button';

function Settings() {
  return (
    <div
      style={{ marginLeft: '-180px' }}
      className="absolute left-0 mr-10 flex h-[500px] w-56 flex-col gap-2 divide-y divide-stone-100 rounded-lg bg-sky-950 px-4 py-6 text-white shadow-lg hover:bg-sky-950 hover:text-white"
    >
      <h3 className="text-xl font-semibold uppercase text-rose-500">
        Thiết lập
      </h3>
      <SettingColor />
      <SettingFontFamily />
      <SettingFontSize />
      <SettingLineHeight />
    </div>
  );
}

function SettingColor() {
  const { handleChangeColor, color } = useSetting();

  return (
    <div className="p-2">
      <h4 className="mb-1 font-semibold">Màu sắc</h4>
      <input
        type="color"
        value={color}
        onChange={e => handleChangeColor(e.target.value)}
      />
    </div>
  );
}

function SettingFontFamily() {
  const fontFamily = ['Roboto', 'DM Sans', 'Times New Roman', 'Lato'];

  const { handleChangeFontFamily } = useSetting();

  return (
    <div className="p-2">
      <h4 className="mb-2 font-semibold">Font chữ</h4>
      <ul className="flex flex-col gap-2 text-sm">
        {fontFamily.map(font => (
          <li
            className="hover:text-gray-400"
            onClick={() => handleChangeFontFamily(font)}
            key={font}
          >
            {font}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingFontSize() {
  const { handleChangeFontSize, fontSize } = useSetting();

  return (
    <div className="flex flex-col items-center p-2">
      <h4 className="mb-2 font-semibold">Cỡ chữ hiển thị</h4>
      <div className="flex items-center gap-2 rounded-xl border">
        <Button onClick={() => handleChangeFontSize(-1)}>-</Button>
        <p>{fontSize}</p>
        <Button onClick={() => handleChangeFontSize(1)}>+</Button>
      </div>
    </div>
  );
}

function SettingLineHeight() {
  const { handleChangeLineHeight, lineHeight } = useSetting();

  return (
    <div className="flex flex-col items-center p-2">
      <h4 className="mb-2 font-semibold">Độ dãn dòng</h4>
      <div className="flex items-center gap-2 rounded-xl border">
        <Button onClick={() => handleChangeLineHeight(-0.25)}>-</Button>
        <p>{lineHeight}</p>
        <Button onClick={() => handleChangeLineHeight(0.25)}>+</Button>
      </div>
    </div>
  );
}

export default Settings;
