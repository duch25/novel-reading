import { useEffect, useState } from 'react';
import { useNavigateItems } from '../context/NavigateItemContext';
import Option from './Option';
import { Reorder } from 'framer-motion';

/* eslint-disable react/prop-types */
function DropdownSources() {
  const { curSources, handleReorderSources } = useNavigateItems();
  const [sources, setSources] = useState(curSources);

  let className = `absolute flex-wrap flex flex-col gap-4 rounded-md border-t border-white bg-white px-3 py-4 text-sm text-gray-950 divide-y divide-200-stone`;
  let height = sources.length * 32 + 32 + 1;
  height = `[${height}px]`;
  className += ` h-${height}`;

  useEffect(
    function () {
      handleReorderSources(sources);
    },
    [sources],
  );

  return (
    <Reorder.Group values={sources} onReorder={setSources}>
      <ul className={className}>
        <span className="absolute right-3 top-1">
          <ion-icon name="hand-right-outline"></ion-icon>
        </span>
        {sources.map(source => (
          <Reorder.Item value={source} key={source}>
            <Option option={source} key={source?.Id} />
          </Reorder.Item>
        ))}
      </ul>
    </Reorder.Group>
  );
}

export default DropdownSources;
