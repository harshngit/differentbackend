import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const Autocompletegiftcard = ({ selected, setSelected, data, placeholder }) => {
	const [query, setQuery] = useState('');

	const filteredProducts = Array.isArray(data)
		? query === ''
			? data
			: data.filter(
				(product) =>
					product?.productName &&
					product.productName
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			)
		: [];

	return (
		<div className="">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className="relative w-full px-3 text-[.8rem] border-[1px] border-gray-500 py-[.6rem] cursor-default overflow-hidden rounded-lg bg-white text-left">
						<Combobox.Input
							className="w-full capitalize text-[InterMedium] text-[16px] placeholder:text-[#959595] border-none outline-none leading-5 text-gray-900 focus:ring-0"
							displayValue={(product) => product?.productName || ''}
							placeholder={placeholder}
							onChange={(event) => setQuery(event.target.value)}
						/>
					</div>

					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 z-[999] capitalize max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
							{filteredProducts.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredProducts.map((product) => (
									<Combobox.Option
										key={product.id || product.productSku}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#1081E0] text-white' : 'text-gray-900'
											}`
										}
										value={product}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${selected ? 'font-medium' : 'font-normal'
														}`}
												>
													{product.productName}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-[#1081E0]'
															}`}
													>
														<CheckIcon className="w-5 h-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default Autocompletegiftcard;
