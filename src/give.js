import React, { useState, useEffect, useRef } from "react";
import "./give.css";
const ROMAN_NUMERALS = ["", " I", " II", " III", " IV", " V"];

const defaultEnchantments = [
    {
        "displayName": "Aqua Affinity",
        "maxLevel": 1,
        "id": "minecraft:aqua_affinity"
    },
    {
        "displayName": "Bane of Arthropods",
        "maxLevel": 5,
        "id": "minecraft:bane_of_arthropods"
    },
    {
        "displayName": "Blast Protection",
        "maxLevel": 4,
        "id": "minecraft:blast_protection"
    },
    {
        "displayName": "Channeling",
        "maxLevel": 1,
        "id": "minecraft:channeling"
    },
    {
        "displayName": "Curse of Binding",
        "maxLevel": 1,
        "id": "minecraft:binding_curse"
    },
    {
        "displayName": "Curse of Vanishing",
        "maxLevel": 1,
        "id": "minecraft:vanishing_curse"
    },
    {
        "displayName": "Depth Strider",
        "maxLevel": 3,
        "id": "minecraft:depth_strider"
    },
    {
        "displayName": "Efficiency",
        "maxLevel": 5,
        "id": "minecraft:efficiency"
    },
    {
        "displayName": "Feather Falling",
        "maxLevel": 4,
        "id": "minecraft:feather_falling"
    },
    {
        "displayName": "Fire Aspect",
        "maxLevel": 2,
        "id": "minecraft:fire_aspect"
    },
    {
        "displayName": "Fire Protection",
        "maxLevel": 4,
        "id": "minecraft:fire_protection"
    },
    {
        "displayName": "Flame",
        "maxLevel": 1,
        "id": "minecraft:flame"
    },
    {
        "displayName": "Fortune",
        "maxLevel": 3,
        "id": "minecraft:fortune"
    },
    {
        "displayName": "Frost Walker",
        "maxLevel": 2,
        "id": "minecraft:frost_walker"
    },
    {
        "displayName": "Impaling",
        "maxLevel": 5,
        "id": "minecraft:impaling"
    },
    {
        "displayName": "Infinity",
        "maxLevel": 1,
        "id": "minecraft:infinity"
    },
    {
        "displayName": "Knockback",
        "maxLevel": 2,
        "id": "minecraft:knockback"
    },
    {
        "displayName": "Looting",
        "maxLevel": 3,
        "id": "minecraft:looting"
    },
    {
        "displayName": "Loyalty",
        "maxLevel": 3,
        "id": "minecraft:loyalty"
    },
    {
        "displayName": "Luck of the Sea",
        "maxLevel": 3,
        "id": "minecraft:luck_of_the_sea"
    },
    {
        "displayName": "Lure",
        "maxLevel": 3,
        "id": "minecraft:lure"
    },
    {
        "displayName": "Mending",
        "maxLevel": 1,
        "id": "minecraft:mending"
    },
    {
        "displayName": "Multishot",
        "maxLevel": 1,
        "id": "minecraft:multishot"
    },
    {
        "displayName": "Piercing",
        "maxLevel": 4,
        "id": "minecraft:piercing"
    },
    {
        "displayName": "Power",
        "maxLevel": 5,
        "id": "minecraft:power"
    },
    {
        "displayName": "Projectile Protection",
        "maxLevel": 4,
        "id": "minecraft:projectile_protection"
    },
    {
        "displayName": "Protection",
        "maxLevel": 4,
        "id": "minecraft:protection"
    },
    {
        "displayName": "Punch",
        "maxLevel": 2,
        "id": "minecraft:punch"
    },
    {
        "displayName": "Quick Charge",
        "maxLevel": 3,
        "id": "minecraft:quick_charge"
    },
    {
        "displayName": "Respiration",
        "maxLevel": 3,
        "id": "minecraft:respiration"
    },
    {
        "displayName": "Riptide",
        "maxLevel": 3,
        "id": "minecraft:riptide"
    },
    {
        "displayName": "Sharpness",
        "maxLevel": 5,
        "id": "minecraft:sharpness"
    },
    {
        "displayName": "Silk Touch",
        "maxLevel": 1,
        "id": "minecraft:silk_touch"
    },
    {
        "displayName": "Smite",
        "maxLevel": 5,
        "id": "minecraft:smite"
    },
    {
        "displayName": "Soul Speed",
        "maxLevel": 3,
        "id": "minecraft:soul_speed"
    },
    {
        "displayName": "Sweeping Edge",
        "maxLevel": 3,
        "id": "minecraft:sweeping_edge"
    },
    {
        "displayName": "Thorns",
        "maxLevel": 3,
        "id": "minecraft:thorns"
    },
    {
        "displayName": "Unbreaking",
        "maxLevel": 3,
        "id": "minecraft:unbreaking"
    }
]
let UIDNEXT = 0;
function useUID() {
    const ref = useRef(UIDNEXT).current
    if (ref === UIDNEXT) UIDNEXT++;
    return "UID_" + ref.toString(16);
}
export function ItemMenu({
    onChange,
    items,
    scale = 1,
    filter = (item, filter_string) => {
        const escaped_filter_string = JSON.stringify(filter_string);
        return item.name.match(escaped_filter_string.substr(1, escaped_filter_string.length - 2));
    }
}) {
    const [item, setItem] = useState({
        id: "air",
        nbt: {},
        count: 1
    });
    const [mouseIn, setMouseIn] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);
    const [top, setTop] = useState(0);
    const [itemsToRender, setItemsToRender] = useState([]);
    const [search, setSearch] = useState("");
    const scrollable_rows = Math.max(0, Math.ceil(items.length / 9 - 5));
    useEffect(() => {
        setItemsToRender(items.filter((item) => filter(item, search)));
    }, [items, search]);
    useEffect(() => {
        setMouseDown(mouseDown && mouseIn);
    }, [mouseIn]);

    useEffect(() => {
        onChange(item)
    }, [item]);
    return <div className="item-select" style={{
        backgroundImage: "url(/give/tab_item_search.png)",
        backgroundSize: "cover",
        width: (195 * scale) + "px",
        height: (114 * scale) + "px",
        imageRendering: "pixelated",
    }}>
        <div className="search-bar" style={{
            position: "relative",
            width: "0px",
            height: "0px",
        }}>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: `${86 * scale}px`,
                    height: `${9 * scale}px`,
                    position: "relative",
                    left: `${81 * scale}px`,
                    top: scale === 1 ? `0px` : `${8 * (scale - 1)}px)`,
                    border: "none",
                    appearance: "none",
                    backgroundColor: "transparent",
                }}></input>
        </div>
        <div style={{
            position: "relative",
            top: `${18 * scale}px`,
            left: `${9 * scale}px`,
            width: `${162 * scale}px`,
            height: `${88 * scale}px`,
            display: "inline-block",
            overflowY: "hidden"
        }}>
            <div style={{
                position: "relative",
                top: -(Math.floor(top * scrollable_rows) * 18 * scale)
            }}>
                {Array(itemsToRender.length).fill(0).map((_, i) => {
                    const index = i// + Math.floor(top * scrollable_rows) * 9;
                    return <div
                        onClick={() => setItem(itemsToRender[index])}
                        key={index}
                        style={{
                            width: `${16 * scale}px`,
                            height: `${16 * scale}px`,
                            position: "absolute",
                            left: `${18 * scale * (index % 9)}px`,
                            top: `${18 * scale * Math.floor(index / 9)}px`,
                            backgroundSize: "cover",
                            backgroundImage: `url(/give/item/${itemsToRender[index].id}.png)`,
                        }}
                        className="item-hover"
                    >
                    </div>
                })}
            </div>
        </div>
        <div style={{
            width: `${12 * scale}px`,
            height: `${88 * scale}px`,
            left: `${13 * scale}px`,
            display: "inline-block",
            position: "relative",
            top: `${18 * scale}px`,
        }}
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}>
            <div
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                onMouseMove={(e) => {
                    if (mouseDown) {
                        const top = e.target.parentElement.getBoundingClientRect().top;
                        if (scrollable_rows > 0) {
                            setTop(Math.min(1, Math.max(0, ((e.clientY - top - (7.5 * scale)) / ((88 * scale) - 15 * scale)))));
                        }
                    }
                }}
                style={{
                    position: "absolute",
                    top: (top * ((88 * scale) - (15 * scale))) + "px",
                    width: `${12 * scale}px`,
                    height: `${15 * scale}px`,
                    backgroundSize: "cover",
                    backgroundImage: scrollable_rows === 0 ? "url(/give/unscrollable-scrollbar.png)" : "url(/give/scrollbar.png)",
                }}>
            </div>
        </div>
    </div>
}


export function EnchantmentMenu({
    onChange = console.log,
    scale,
    enchantments = defaultEnchantments
}) {
    const [mouseIn, setMouseIn] = useState(false);
    const [mouseDown, setMouseDown] = useState(false);
    const [top, setTop] = useState(0);
    const [levels, setLevels] = useState({});
    useEffect(() => {
        setMouseDown(mouseDown && mouseIn);
    }, [mouseIn]);
    useEffect(() => {
        onChange(levels);
    }, [levels]);
    return <div style={{
        backgroundImage: "url(/give/enchantments.png)",
        backgroundSize: "cover",
        width: (195 * scale) + "px",
        height: (114 * scale) + "px",
        imageRendering: "pixelated"
    }}>
        <div style={{
            position: "relative",
            top: `${10 * scale}px`,
            left: `${7 * scale}px`,
            width: `${162 * scale}px`,
            height: `${95 * scale}px`,
            display: "inline-block",
            overflow: "hidden"
        }}>
            <div style={{
                position: "relative",
                top: -Math.max(0, Math.floor(top * (enchantments.length - 5))) * 19 * scale + "px"
            }}>
                {enchantments.map(enchantment => {

                    return <div
                        key={enchantment.id}
                        style={{
                            width: `${162 * scale}px`,
                            height: `${19 * scale}px`,
                            display: "flex"
                        }}>
                        <div
                            className={["button", "ec-rem", !levels[enchantment.id] && "unselected"].filter(Boolean).join(" ")}
                            onClick={() => {
                                setLevels(
                                    Object.fromEntries(
                                        Object.entries({
                                            ...levels,
                                            [enchantment.id]: Math.max((levels[enchantment.id] || 0) - 1, 0)
                                        }).filter(([name, value]) => value)
                                    )
                                );
                            }}
                            style={{
                                width: `${19 * scale}px`,
                                height: `${19 * scale}px`
                            }}></div>
                        <div
                            className={["ec-content", !levels[enchantment.id] && "unselected"].filter(Boolean).join(" ")}
                            style={{
                                width: `${124 * scale}px`,
                                height: `${19 * scale}px`,
                                fontSize: `${8 * scale}px`,
                                lineHeight: `${19 * scale}px`
                            }}>
                            {enchantment.displayName}
                            {ROMAN_NUMERALS[levels[enchantment.id] || 0]}
                        </div>
                        <div
                            className={["button", "ec-add", levels[enchantment.id] === enchantment.maxLevel && "unselected"].filter(Boolean).join(" ")}
                            onClick={() => {
                                setLevels({
                                    ...levels,
                                    [enchantment.id]: Math.min((levels[enchantment.id] || 0) + 1, enchantment.maxLevel)
                                });
                            }}
                            style={{
                                width: `${19 * scale}px`,
                                height: `${19 * scale}px`
                            }}></div>
                    </div>
                })}
            </div>
        </div>
        <div style={{
            width: `${12 * scale}px`,
            height: `${95 * scale}px`,
            left: `${13 * scale}px`,
            display: "inline-block",
            position: "relative",
            top: `${10 * scale}px`,
        }}
            onMouseEnter={() => setMouseIn(true)}
            onMouseLeave={() => setMouseIn(false)}>
            <div
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                onMouseMove={(e) => {
                    if (mouseDown) {
                        const top = e.target.parentElement.getBoundingClientRect().top;
                        setTop(Math.min(1, Math.max(0, ((e.clientY - top - (7.5 * scale)) / ((95 * scale) - (15 * scale))))));
                    }
                }}
                style={{
                    position: "absolute",
                    top: (top * ((95 * scale) - (15 * scale))) + "px",
                    width: `${12 * scale}px`,
                    height: `${15 * scale}px`,
                    backgroundSize: "cover",
                    backgroundImage: "url(/give/scrollbar.png)",
                }}>
            </div>
        </div>
    </div>
}

export function GiveMenu({
    items,
    onSubmit,
    scale = 2,
    enchantments = defaultEnchantments
}) {
    const [item, setItem] = useState({ id: "barrier", name: "" });
    const [enchantment, setEnchantment] = useState({});
    const [name, setName] = useState("");
    const [count, setCount] = useState(1);
    const nameId = useUID();
    const countId = useUID();
    return <div>
        <div style={{
            width: `${390 * scale}px`,
            height: `${228 * scale}px`,
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "50% 50%",
            fontSize: `${12 * scale}px`
        }}>
            <div style={{
                width: `${195 * scale}px`,
                height: `${114 * scale}px`
            }}>
                <ItemPreview
                    item={item}
                    name={name}
                    count={count}
                    scale={scale}
                    enchantments={
                        Object.entries(enchantment).map(([id, level]) => {
                            const ench = enchantments.find(item => item.id === id);
                            return `${ench.displayName} ${ROMAN_NUMERALS[level]}`
                        })
                    }
                ></ItemPreview>
            </div>
            <div style={{
                width: `${195 * scale}px`,
                height: `${114 * scale}px`
            }}>
                <ItemMenu items={items} onChange={setItem} scale={scale}></ItemMenu>
            </div>
            <div style={{
                width: `${195 * scale}px`,
                height: `${114 * scale}px`
            }}>
                <label htmlFor={nameId}>Item Name:</label>
                <input
                    type="text"
                    id={nameId}
                    placeholder={item?.name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <br />
                <label htmlFor={countId}>Item Count:</label>
                <input
                    type="number"
                    id={countId}
                    min={1}
                    max={64}
                    defaultValue={1}
                    onChange={(e) => {
                        //clamp because of inspect element
                        setCount(Math.max(1, Math.min(e.target.value, 64)));
                    }}
                />
            </div>
            <div style={{
                width: `${195 * scale}px`,
                height: `${114 * scale}px`
            }}>
                <EnchantmentMenu
                    scale={scale}
                    onChange={setEnchantment}
                    enchantments={enchantments}
                ></EnchantmentMenu>
            </div>
        </div>
        <div>
            <button onClick={() => {
                const itemStr = `${item.id}${Object.keys(enchantment).length > 0 || name ? `{${
                    Object.keys(enchantment).length > 0 ?
                        `Enchantments:[${Object.entries(enchantment).map(([id, lvl]) => (
                            `{id:"${id}",lvl:${lvl + "s"}}`
                        ))}]${name ? "," : ""}`
                        :
                        ""
                    }${name ? `display:{Name:'{"text":"${name.replace(/'/g, "\\'")}"}'}` : ""}}` : ""}`
                onSubmit({ item: itemStr, count });
            }}>submit</button>
        </div>
    </div>
}
function ItemPreview({
    item,
    name,
    count,
    enchantments,
    scale
}) {
    return <div
        style={{
            width: `${34 * scale}px`,
            height: `${34 * scale}px`,
            // backgroundImage: "url(/give/item-background.png)",
            backgroundSize: "cover",
            imageRendering: "pixelated"
        }}
    >
        <div
            style={{
                position: "relative",
                top: `${2 * scale}px`,
                left: `${2 * scale}px`,
                width: `${30 * scale}px`,
                height: `${30 * scale}px`,
                backgroundImage: `url(/give/item/${item.id}.png)`,
                backgroundSize: "cover",
                imageRendering: "pixelated"
            }}
        >
            <div style={{
                position: "relative",
                top: `${20 * scale}px`,
                left: `${20 * scale}px`,
                fontSize: `${10 * scale}px`
            }}>{item.id === "air" ? "" : <strong>{count}</strong>}</div>
        </div>
        {item.id === "air" ? "" : <div className="item-host" style={{
            borderImageWidth: `${5 * scale}px`,
            padding: `${5 * scale}px`
        }}>
            <strong>{name.trim() || item.name}</strong>
            <ul className="item-enchantments">
                {enchantments.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>}
    </div>
}

export { ItemPreview as unsafe_ItemPreview };