import React, { useState, useEffect, useMemo, useRef, useId } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ShoppingBag,
  Calendar,
  Plus,
  Trash2,
  Search,
  Moon,
  Sun,
  Utensils,
  ChevronDown,
  ChevronRight,
  X,
  Store,
  CheckSquare,
  RotateCcw,
  Printer,
  ArrowUpDown,
  Check,
  ShoppingCart,
  Cloud,
  CloudOff,
} from 'lucide-react';

const SUPABASE_URL = 'https://cyxyvcdjguslfhvcklhj.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

const supabase = (SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_ANON_KEY_HERE')
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const STORES = ['Walmart', 'Safeway', 'King Soopers', "Sam's Club"];

const CATEGORY_ORDER = [
  'Oils & Vinegars', 'Wine & Broth', 'Canned & Dry Goods', 'Baking', 'Pasta & Rice',
  'Sauces & Condiments', 'Bread & Wraps', 'Spices', 'Snacks', 'Dairy', 'Produce',
  'Frozen', 'Meat', 'Deli', 'Drinks', 'Housewares', 'Cleaning', 'Toiletries', 'Pets', 'Other',
];

const PANTRY = [
  'Canola oil', 'Olive oil', 'Toasted sesame oil', "Baker's Joy", 'Pam', 'Vinegar', 'Red wine vinegar',
  'Balsamic vinegar', 'Rice wine', 'Tequila', 'White wine', 'Marsala wine', 'Beef broth', 'Beef stock',
  'Chicken broth', 'Chicken stock', 'Veggie broth', 'Veggie stock', 'Sauce', 'Salsa', 'Diced tomatoes',
  'Whole tomatoes', 'Tomato paste', 'Pinto beans', 'Black beans', 'Chipotles in adobo',
  'Chopped green chiles', 'Bisquick', 'Corn starch', 'Sugar', 'Brown sugar', 'All-purpose flour',
  'Bread flour', 'Cake flour', 'Yeast', 'Oats', 'Pumpkin', 'Cocoa', 'Vanilla', 'Chocolate chips',
  'Baking soda', 'Baking powder', 'Rice sides', 'Gnocchi', 'Asian chili sauce', 'Soy sauce', 'Spaghetti',
  'Elbow pasta', 'Rigatoni', 'Penne', 'Broccoli pasta', 'Cheese pasta', 'Breadcrumbs', 'Panko',
  'ST stuffing PF', 'Dried shiitakes', 'Sundried tomatoes', 'Artichokes', 'Long grain rice',
  'Basmati rice', 'Jasmine rice', 'Applesauce', 'Pesto', 'Peanut butter', 'Jelly', 'Mayonnaise',
  'Ketchup', 'Mustard', 'Syrup', 'Chocolate syrup', 'Taco shells', 'Wraps', 'Egg roll wraps', 'Bread',
  'Bagels', 'English muffins', 'Rolls', 'Buns', 'Muffins',
  'Sea salt', 'Kosher salt', 'Salt', 'Pepper', 'Cayenne', 'Peppercorns', 'Ginger', 'Garlic salt',
  'Garlic powder', 'Garlic granules', 'Seasoned salt', 'Chives', 'Cajun seasoning', 'Creole seasoning',
  'Adobo', 'Chipotle powder', 'Chili powder', 'Basil (dried)', 'Oregano', 'Thyme (dried)',
  'Red pepper flakes', 'Chia seeds', 'Marjoram', 'Parsley (dried)', 'Sage (dried)', 'Onion salt',
  'Onion powder', 'Onion granules', 'Cumin', 'Smoked paprika', 'Coriander', 'Bay leaves', 'Cinnamon',
  'Cloves', 'Nutmeg',
];

const pantryCategory = (n) => {
  if ([1, 2, 3, 5, 6, 7, 8].includes(n)) return 'Oils & Vinegars';
  if (n >= 9 && n <= 18) return 'Wine & Broth';
  if ((n >= 19 && n <= 27) || [56, 57, 58, 62].includes(n)) return 'Canned & Dry Goods';
  if (n === 4 || (n >= 28 && n <= 42)) return 'Baking';
  if ([43, 44].includes(n) || (n >= 47 && n <= 52) || (n >= 59 && n <= 61)) return 'Pasta & Rice';
  if ([45, 46].includes(n) || (n >= 63 && n <= 70)) return 'Sauces & Condiments';
  if ((n >= 53 && n <= 55) || (n >= 71 && n <= 79)) return 'Bread & Wraps';
  return 'Spices';
};

const SNACKS = ['Doritos', 'Tostitos', 'Triscuits', 'Popcorn', 'Popcorn seasoning', 'Oreos', 'Chips Ahoy', 'Graham crackers', 'Goldfish', 'Chocolate', 'Nuts', 'Nutella snacks'];
const DAIRY = ['Milk', 'Buttermilk', 'Eggs', 'Butter', 'Orange juice', 'Apple juice', 'Sour cream', 'Yogurt', 'Greek yogurt', 'Ricotta', 'Cottage cheese', 'Cream cheese', 'Whipping cream', 'Whipped cream', 'Mozzarella', 'Queso', 'Parmesan', 'Mozzarella pearls', 'Fontina', 'Gruyere'];
const PRODUCE = ['Pizza dough', 'Garlic', 'Cilantro', 'Mint', 'Basil (fresh)', 'Parsley (fresh)', 'Sage (fresh)', 'Rosemary', 'Thyme (fresh)', 'Scallions', 'Onions', 'Shallots', 'Grapes', 'Apples', 'Strawberries', 'Bananas', 'Pears', 'Clementines', 'Oranges', 'Lemons', 'Limes', 'Carrots', 'Corn', 'Red peppers', 'Yellow peppers', 'Green peppers', 'Tomatoes', 'Mushrooms', 'Cucumber', 'Spinach lettuce', 'Regular potatoes', 'Sweet potatoes', 'Yellow squash', 'Zucchini', 'Butternut squash', 'Blueberries', 'Veggies'];
const FROZEN = ['Garlic bread', 'Bacon', 'Sausages', 'French fries', 'Italian ices', 'Ice cream', 'Pizza rolls'];
const MEAT = ['Steaks', 'Tri-tip', 'Flank steak', 'Ground beef', 'Ground pork', 'Ground chicken', 'Hot dogs', 'Burgers', 'Pork chops', 'Pork tenderloin', 'Chicken breasts', 'Chicken legs', 'Chicken tenderloins'];
const DELI = ['Ham', 'Pepperoni', 'Salami', 'American cheese', 'Provolone', 'Rotisserie chicken'];
const DRINKS = ['Pepsi', 'Riptide Rush', 'Iced tea', 'Lemonade'];
const HOUSEWARES = ['Cupcake liners', 'Parchment paper', 'Aluminum foil', 'Plastic wrap', 'Waxed paper', 'Sandwich bags', 'Freezer bags', 'Storage bags', 'Small garbage bags', 'Garbage bags', 'Napkins', 'Plasticware', 'Paper plates', 'Paper towels', 'Toilet paper', 'Matches', 'Candles', 'Lightbulbs', 'Batteries', 'Scotch tape', 'Paper', 'Pens', 'Pencils'];
const CLEANING = ['Hand soap', 'Dish soap', 'Cascade', 'Jet Dry', 'Lysol wipes', 'Clorox wipes', 'Clorox 2', 'Era', 'Bounce', 'Starch', 'Windex', 'Pledge', 'Leather wipes', 'Sponges', 'Magic eraser', 'Shower cleaner', 'Toilet cleaner'];
const TOILETRIES = ['Shampoo', 'Conditioner', 'Soap', 'Deodorant', 'Toothpaste', 'Dental floss', 'Mouthwash', 'Tampons', 'Pads', 'Razor blades', 'Contact solution', 'Shaving cream', 'Cetaphil', 'Moisturizer', 'Primer', 'Foundation', 'Concealer', 'Eye bright', 'Powder', 'Eye liner', 'Eye shadow', 'Mascara', 'Blush', 'Lipstick', 'Eye makeup remover', 'Perfume', 'Cologne', 'Heat styler', 'Lotion', 'Advil', 'Tylenol', 'Vitamins', 'Wipes', 'Dog food', 'Dog treats', 'Dog toys', 'Pet bags'];

const build = (prefix, store, names, category) =>
  names.map((name, i) => ({
    id: `${prefix}${i + 1}`,
    name,
    category: typeof category === 'function' ? category(i + 1) : category,
    defaultStore: store,
    needed: false,
    qty: 1,
  }));

const INITIAL_ITEMS = [
  ...build('p', 'Walmart', PANTRY, pantryCategory),
  ...build('s', 'King Soopers', SNACKS, 'Snacks'),
  ...build('d', 'Safeway', DAIRY, 'Dairy'),
  ...build('pr', 'Safeway', PRODUCE, 'Produce'),
  ...build('f', 'Walmart', FROZEN, 'Frozen'),
  ...build('m', 'Safeway', MEAT, 'Meat'),
  ...build('dl', 'Safeway', DELI, 'Deli'),
  ...build('dr', 'Walmart', DRINKS, 'Drinks'),
  ...build('h', 'Walmart', HOUSEWARES, 'Housewares'),
  ...build('cl', 'Walmart', CLEANING, 'Cleaning'),
  ...build('t', 'Walmart', TOILETRIES, (n) => (n >= 34 ? 'Pets' : 'Toiletries')),
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const freshMeals = () => DAYS.map((day) => ({ day, date: '', dinner: '', ingredients: [] }));

const DARK_KEY = 'master_grocery_dark_v1';

const isCustom = (item) => typeof item.id === 'string' && item.id.startsWith('custom_');
const newCustomId = () => `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const cleanCategory = (c) => (CATEGORY_ORDER.includes(c) ? c : 'Other');
const cleanStore = (s) => (STORES.includes(s) ? s : 'Walmart');
const clampQty = (q) => Math.min(99, Math.max(1, Number.parseInt(q, 10) || 1));

const mergeSaved = (saved) => {
  const list = Array.isArray(saved) ? saved : [];
  const savedById = new Map(list.filter((i) => i && i.id).map((i) => [i.id, i]));
  const merged = INITIAL_ITEMS.map((d) => {
    const s = savedById.get(d.id);
    return s ? { ...d, needed: !!s.needed, qty: clampQty(s.qty) } : d;
  });
  const customs = list.filter((i) => i && i.name && isCustom(i)).map((i) => ({
    id: i.id,
    name: String(i.name),
    category: cleanCategory(i.category),
    defaultStore: cleanStore(i.defaultStore),
    needed: !!i.needed,
    qty: clampQty(i.qty),
  }));
  return [...customs, ...merged];
};

const normalizeMeals = (saved) => {
  const list = Array.isArray(saved) ? saved : [];
  return freshMeals().map((base) => {
    const s = list.find((m) => m && m.day === base.day);
    if (!s) return base;
    return {
      ...base,
      date: typeof s.date === 'string' ? s.date : '',
      dinner: typeof s.dinner === 'string' ? s.dinner : '',
      ingredients: Array.isArray(s.ingredients) ? s.ingredients.filter((x) => typeof x === 'string') : [],
    };
  });
};

const useArmed = (ms = 4000) => {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const t = setTimeout(() => setArmed(false), ms);
    return () => clearTimeout(t);
  }, [armed, ms]);
  return [armed, setArmed];
};

function Modal({ title, icon: Icon, onClose, wide, children }) {
  const titleId = useId();
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(e) => e.stopPropagation()} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full ${wide ? 'max-w-3xl max-h-[90vh] overflow-y-auto' : 'max-w-md'} shadow-2xl space-y-4`}>
        <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
          <h3 id={titleId} className="font-bold text-base flex items-center space-x-2">
            {Icon && <Icon className="w-5 h-5 text-emerald-500" />}
            <span>{title}</span>
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PrintableList({ items }) {
  const storeNames = [...STORES, ...new Set(items.map((i) => i.defaultStore).filter((s) => !STORES.includes(s)))];
  const groups = storeNames.map((name) => [name, items.filter((i) => i.needed && i.defaultStore === name)]).filter(([, list]) => list.length > 0);

  if (groups.length === 0) {
    return <p className="text-sm text-slate-500">Nothing in the cart yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {groups.map(([name, list]) => (
        <div key={name} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 print:bg-white border border-slate-200 dark:border-slate-700/60 print:border-slate-400 space-y-2 break-inside-avoid">
          <h4 className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 print:text-black border-b pb-1 border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span>{name}</span>
            <span className="text-xs">{list.length} items</span>
          </h4>
          <ul className="space-y-1.5">
            {list.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm py-1 border-b border-dashed border-slate-200 dark:border-slate-700/40 last:border-0">
                <span className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded border border-slate-400 inline-block" />
                  <span>{item.name}</span>
                </span>
                <span className="font-bold text-slate-500 print:text-black">Qty: {item.qty || 1}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState(() => mergeSaved([]));
  const [mealPlan, setMealPlan] = useState(() => normalizeMeals([]));
  const [syncStatus, setSyncStatus] = useState('connecting');

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = window.localStorage.getItem(DARK_KEY);
      if (saved !== null) return saved === '1';
      return !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState('grocery');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState('All');
  const [viewMode, setViewMode] = useState('category');
  const [sortBy, setSortBy] = useState('default');
  const [collapsed, setCollapsed] = useState({});

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Other');
  const [newItemStore, setNewItemStore] = useState('Walmart');

  const [clearArmed, setClearArmed] = useArmed();
  const [resetArmed, setResetArmed] = useArmed();

  const [drafts, setDrafts] = useState({});
  const [flashDay, setFlashDay] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setSyncStatus('offline');
      return;
    }

    const loadData = async () => {
      try {
        const { data, error } = await supabase.from('app_state').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          const listRow = data.find((r) => r.id === 'grocery_list');
          const mealRow = data.find((r) => r.id === 'meal_plan');
          if (listRow) setItems(mergeSaved(listRow.data));
          if (mealRow) setMealPlan(normalizeMeals(mealRow.data));
        }
        setSyncStatus('synced');
      } catch (err) {
        console.error('Error loading from Supabase:', err);
        setSyncStatus('offline');
      }
    };

    loadData();

    const channel = supabase
      .channel('public:app_state')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'app_state' }, (payload) => {
        if (payload.new) {
          if (payload.new.id === 'grocery_list') setItems(mergeSaved(payload.new.data));
          else if (payload.new.id === 'meal_plan') setMealPlan(normalizeMeals(payload.new.data));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const saveData = async (newItems, newMeals) => {
    if (!supabase) return;
    try {
      await supabase.from('app_state').upsert([
        { id: 'grocery_list', data: newItems, updated_at: new Date() },
        { id: 'meal_plan', data: newMeals, updated_at: new Date() },
      ]);
      setSyncStatus('synced');
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      setSyncStatus('offline');
    }
  };

  const updateItemsAndSync = (updater) => {
    setItems((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveData(next, mealPlan);
      return next;
    });
  };

  const updateMealsAndSync = (updater) => {
    setMealPlan((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveData(items, next);
      return next;
    });
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(DARK_KEY, darkMode ? '1' : '0');
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    if (!flashDay) return undefined;
    const t = setTimeout(() => setFlashDay(null), 2500);
    return () => clearTimeout(t);
  }, [flashDay]);

  const toggleNeeded = (id) => updateItemsAndSync((prev) => prev.map((i) => (i.id === id ? { ...i, needed: !i.needed, qty: 1 } : i)));
  const updateQty = (id, delta) => updateItemsAndSync((prev) => prev.map((i) => (i.id === id ? { ...i, qty: clampQty((i.qty || 1) + delta), needed: true } : i)));

  const clearNeededItems = () => {
    if (!clearArmed) {
      setClearArmed(true);
      return;
    }
    updateItemsAndSync((prev) => prev.map((i) => ({ ...i, needed: false, qty: 1 })));
    setClearArmed(false);
  };

  const deleteItem = (id) => updateItemsAndSync((prev) => prev.filter((i) => i.id !== id || !isCustom(i)));

  const addNamesToCart = (names, fallbackCategory = 'Other', fallbackStore = 'Walmart') => {
    setItems((prev) => {
      const next = [...prev];
      const created = [];
      names.forEach((raw) => {
        const name = raw.trim();
        if (!name) return;
        const idx = next.findIndex((i) => i.name.toLowerCase() === name.toLowerCase());
        if (idx >= 0) {
          if (!next[idx].needed) next[idx] = { ...next[idx], needed: true, qty: 1 };
        } else if (!created.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
          created.push({ id: newCustomId(), name, category: fallbackCategory, defaultStore: fallbackStore, needed: true, qty: 1 });
        }
      });
      const combined = [...created, ...next];
      saveData(combined, mealPlan);
      return combined;
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const name = newItemName.trim();
    if (!name) return;
    addNamesToCart([name], newItemCategory, newItemStore);
    setNewItemName('');
    setShowAddItemModal(false);
  };

  const updateMeal = (index, field, value) => updateMealsAndSync((prev) => prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)));

  const addIngredient = (index) => {
    const slot = mealPlan[index];
    const name = (drafts[slot.day] || '').trim().slice(0, 60);
    if (!name) return;
    if (!slot.ingredients.some((x) => x.toLowerCase() === name.toLowerCase())) {
      updateMealsAndSync((prev) => prev.map((s, i) => (i === index ? { ...s, ingredients: [...s.ingredients, name] } : s)));
    }
    setDrafts((d) => ({ ...d, [slot.day]: '' }));
  };

  const removeIngredient = (index, name) => updateMealsAndSync((prev) => prev.map((s, i) => (i === index ? { ...s, ingredients: s.ingredients.filter((x) => x !== name) } : s)));

  const sendIngredientsToCart = (slot) => {
    addNamesToCart(slot.ingredients);
    setFlashDay(slot.day);
  };

  const [listCopyStatus, setListCopyStatus] = useState('idle');
  const listInputRef = useRef(null);

  const buildListText = () => {
    const names = [...STORES, ...new Set(items.map((i) => i.defaultStore).filter((s) => !STORES.includes(s)))];
    return names.map((name) => [name, items.filter((i) => i.needed && i.defaultStore === name)]).filter(([, list]) => list.length > 0).map(([name, list]) => `${name}\n${list.map((i) => `[ ] ${i.name}${(i.qty || 1) > 1 ? ` x${i.qty}` : ''}`).join('\n')}`).join('\n\n');
  };

  const copyListText = async () => {
    const text = buildListText();
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        listInputRef.current?.select();
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
    }
    setListCopyStatus(ok ? 'copied' : 'failed');
    setTimeout(() => setListCopyStatus('idle'), 3000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      setListCopyStatus('failed');
    }
  };

  const resetWeek = () => {
    if (!resetArmed) {
      setResetArmed(true);
      return;
    }
    updateMealsAndSync(freshMeals());
    setResetArmed(false);
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.defaultStore.toLowerCase().includes(q);
      const matchesStore = selectedStore === 'All' || item.defaultStore === selectedStore;
      const matchesTab = activeTab !== 'needed' || item.needed;
      return matchesSearch && matchesStore && matchesTab;
    });
  }, [items, searchQuery, selectedStore, activeTab]);

  const orderedGroups = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      const key = viewMode === 'category' ? item.category : item.defaultStore;
      (groups[key] = groups[key] || []).push(item);
    });
    const order = viewMode === 'category' ? CATEGORY_ORDER : STORES;
    const keys = [...order.filter((k) => groups[k]), ...Object.keys(groups).filter((k) => !order.includes(k))];
    return keys.map((k) => [k, sortBy === 'alphabetical' ? [...groups[k]].sort((a, b) => a.name.localeCompare(b.name)) : groups[k]]);
  }, [filteredItems, viewMode, sortBy]);

  const neededCount = useMemo(() => items.filter((i) => i.needed).length, [items]);
  const plannedMeals = mealPlan.filter((s) => s.dinner.trim());

  const tabClass = (tab) => `flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${activeTab === tab ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'}`;
  const fieldClass = 'w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400';

  const darkToggle = (extra) => (
    <button type="button" onClick={() => setDarkMode((d) => !d)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition ${extra}`}>
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="print:hidden min-h-screen font-sans transition-colors duration-200 bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-500 rounded-2xl text-white shadow-md shadow-emerald-500/20">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-extrabold text-base tracking-tight">Grocery &amp; Meal Planner</h1>
                    <span className="flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {syncStatus === 'synced' && <><Cloud className="w-3 h-3 text-emerald-500" /><span>Synced</span></>}
                      {syncStatus === 'connecting' && <span>Connecting…</span>}
                      {syncStatus === 'offline' && <><CloudOff className="w-3 h-3 text-amber-500" /><span>Offline Mode</span></>}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Master list and weekly dinners</p>
                </div>
              </div>
              {darkToggle('sm:hidden')}
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full sm:w-auto justify-center">
              <button type="button" onClick={() => setActiveTab('grocery')} aria-pressed={activeTab === 'grocery'} className={tabClass('grocery')}>
                <Store className="w-3.5 h-3.5" />
                <span>Master List ({items.length})</span>
              </button>
              <button type="button" onClick={() => setActiveTab('needed')} aria-pressed={activeTab === 'needed'} className={tabClass('needed')}>
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Shopping Cart ({neededCount})</span>
              </button>
              <button type="button" onClick={() => setActiveTab('mealplan')} aria-pressed={activeTab === 'mealplan'} className={tabClass('mealplan')}>
                <Calendar className="w-3.5 h-3.5" />
                <span>Meal Plan</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button type="button" onClick={() => setShowPrintModal(true)} aria-label="Print list" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition">
                <Printer className="w-4 h-4 text-emerald-500" />
                <span className="hidden sm:inline">Print List</span>
              </button>
              {darkToggle('hidden sm:flex')}
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'mealplan' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-3 border-b pb-4 border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="font-extrabold text-lg flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <span>Weekly Dinner Planner</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Plan each dinner, list its ingredients, then send them to the cart in one tap.</p>
                </div>
                <button type="button" onClick={resetWeek} className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition shrink-0 ${resetArmed ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{resetArmed ? 'Tap again to confirm' : 'Reset Week'}</span>
                </button>
              </div>

              <datalist id="master-items">
                {items.map((i) => <option key={i.id} value={i.name} />)}
              </datalist>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mealPlan.map((slot, index) => (
                  <div key={slot.day} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>{slot.day}</span>
                      </span>
                      <input type="date" aria-label={`Date for ${slot.day}`} value={slot.date || ''} onChange={(e) => updateMeal(index, 'date', e.target.value)} className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1 outline-none text-slate-600 dark:text-slate-300" />
                    </div>

                    <input type="text" aria-label={`Dinner for ${slot.day}`} value={slot.dinner || ''} placeholder="Dinner plan (e.g. Grilled chicken & salad)" onChange={(e) => updateMeal(index, 'dinner', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />

                    {slot.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {slot.ingredients.map((name) => (
                          <span key={name} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                            {name}
                            <button type="button" onClick={() => removeIngredient(index, name)} aria-label={`Remove ${name}`} className="rounded-full hover:bg-emerald-500/20 p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input type="text" list="master-items" aria-label={`Add ingredient for ${slot.day}`} value={drafts[slot.day] || ''} placeholder="Add ingredient…" onChange={(e) => setDrafts((d) => ({ ...d, [slot.day]: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addIngredient(index); } }} className="flex-1 min-w-0 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                      <button type="button" onClick={() => addIngredient(index)} aria-label={`Add ingredient to ${slot.day}`} className="px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {slot.ingredients.length > 0 && (
                      <button type="button" onClick={() => sendIngredientsToCart(slot)} className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition">
                        {flashDay === slot.day ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                        <span>{flashDay === slot.day ? 'Added to cart' : `Add ${slot.ingredients.length} ingredient${slot.ingredients.length === 1 ? '' : 's'} to cart`}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'mealplan' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input type="text" aria-label="Search items" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={`Search ${items.length} items...`} className="w-full pl-10 pr-9 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                    {searchQuery && (
                      <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    <select aria-label="Filter by store" value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-2xl text-xs font-semibold outline-none text-slate-700 dark:text-slate-200 cursor-pointer">
                      <option value="All">All Stores</option>
                      {STORES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <select aria-label="Group items by" value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border-0 rounded-2xl text-xs font-semibold outline-none text-slate-700 dark:text-slate-200 cursor-pointer">
                      <option value="category">Group by Category</option>
                      <option value="store">Group by Store</option>
                    </select>

                    <button type="button" onClick={() => setSortBy((s) => (s === 'default' ? 'alphabetical' : 'default'))} className={`px-3 py-2 rounded-2xl text-xs font-semibold flex items-center space-x-1.5 transition ${sortBy === 'alphabetical' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}>
                      <ArrowUpDown className="w-3.5 h-3.5" />
                      <span>{sortBy === 'alphabetical' ? 'Sorted A–Z' : 'Default Order'}</span>
                    </button>

                    <button type="button" onClick={() => setShowAddItemModal(true)} className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition">
                      <Plus className="w-4 h-4" />
                      <span>Add Item</span>
                    </button>

                    {neededCount > 0 && activeTab === 'needed' && (
                      <button type="button" onClick={clearNeededItems} className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center space-x-1 transition ${clearArmed ? 'bg-rose-500 text-white' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400'}`}>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{clearArmed ? 'Tap again to clear all' : 'Clear Needed'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {orderedGroups.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                      {activeTab === 'needed' && !searchQuery && selectedStore === 'All' ? 'Your cart is empty' : 'No items found'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeTab === 'needed' && !searchQuery && selectedStore === 'All' ? 'Tap items on the Master List to add them here.' : 'Try adjusting your search or filters.'}
                    </p>
                  </div>
                ) : (
                  orderedGroups.map(([groupName, groupItems]) => {
                    const isCollapsed = collapsed[groupName];
                    const neededInGroup = groupItems.filter((i) => i.needed).length;
                    return (
                      <section key={groupName} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                        <button type="button" aria-expanded={!isCollapsed} onClick={() => setCollapsed((prev) => ({ ...prev, [groupName]: !prev[groupName] }))} className="w-full text-left px-5 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                          <span className="flex items-center space-x-2.5">
                            {isCollapsed ? <ChevronRight className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-emerald-500" />}
                            <span className="font-extrabold text-xs tracking-wider text-slate-800 dark:text-slate-200">{groupName}</span>
                            <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-full">
                              {groupItems.length}
                            </span>
                          </span>
                          {neededInGroup > 0 && (
                            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/20">
                              {neededInGroup} needed
                            </span>
                          )}
                        </button>

                        {!isCollapsed && (
                          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {groupItems.map((item) => (
                              <div key={item.id} role="button" tabIndex={0} aria-pressed={item.needed} onClick={() => toggleNeeded(item.id)} onKeyDown={(e) => { if (e.target !== e.currentTarget) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNeeded(item.id); } }} className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${item.needed ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30 shadow-sm' : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                                <div className="flex items-center space-x-2.5 min-w-0">
                                  <span aria-hidden="true" className={`w-5 h-5 rounded-lg flex items-center justify-center transition shrink-0 ${item.needed ? 'bg-emerald-500 text-white shadow-sm' : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'}`}>
                                    {item.needed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </span>
                                  <span className={`text-sm truncate ${item.needed ? 'text-emerald-900 dark:text-emerald-200 font-bold' : 'text-slate-700 dark:text-slate-300 font-semibold'}`}>
                                    {item.name}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-200/60 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    {item.defaultStore}
                                  </span>

                                  {item.needed && (
                                    <div className="flex items-center space-x-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-1.5 py-0.5">
                                      <button type="button" onClick={() => updateQty(item.id, -1)} aria-label={`Decrease ${item.name} quantity`} className="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500">-</button>
                                      <span className="text-xs font-bold px-1 text-emerald-700 dark:text-emerald-400" aria-label={`Quantity ${item.qty || 1}`}>{item.qty || 1}</span>
                                      <button type="button" onClick={() => updateQty(item.id, 1)} aria-label={`Increase ${item.name} quantity`} className="w-5 h-5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500">+</button>
                                    </div>
                                  )}

                                  {isCustom(item) && (
                                    <button type="button" onClick={() => deleteItem(item.id)} aria-label={`Delete ${item.name}`} className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-500/10">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </main>

        {showAddItemModal && (
          <Modal title="Add Custom Item" icon={Plus} onClose={() => setShowAddItemModal(false)}>
            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label htmlFor="new-item-name" className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Item name</label>
                <input id="new-item-name" type="text" required autoFocus value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="e.g. Almond milk" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="new-item-category" className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Category</label>
                <select id="new-item-category" value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                  {CATEGORY_ORDER.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="new-item-store" className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Preferred store</label>
                <select id="new-item-store" value={newItemStore} onChange={(e) => setNewItemStore(e.target.value)} className={`${fieldClass} cursor-pointer`}>
                  {STORES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <button type="button" onClick={() => setShowAddItemModal(false)} className="w-1/2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-semibold">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-md shadow-emerald-500/20">Add to cart</button>
              </div>
            </form>
          </Modal>
        )}

        {showPrintModal && (
          <Modal title="Printable Shopping List (by store)" icon={Printer} wide onClose={() => setShowPrintModal(false)}>
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">Items needed: {neededCount}</p>
                  <p className="text-xs text-slate-500">Prints just this list, not the rest of the page.</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={copyListText} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-xl font-bold flex items-center space-x-1.5">
                    {listCopyStatus === 'copied' ? <Check className="w-4 h-4" /> : null}
                    <span>{listCopyStatus === 'copied' ? 'Copied' : 'Copy as text'}</span>
                  </button>
                  <button type="button" onClick={handlePrint} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center space-x-1.5 shadow-md">
                    <Printer className="w-4 h-4" />
                    <span>Print Now</span>
                  </button>
                </div>
              </div>
              <textarea ref={listInputRef} readOnly aria-label="Shopping list as text" value={buildListText()} className="sr-only" />
              <PrintableList items={items} />
            </div>
            <button type="button" onClick={() => setShowPrintModal(false)} className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs">Close</button>
          </Modal>
        )}
      </div>

      <div className="hidden print:block p-6 bg-white text-black">
        <h1 className="text-xl font-extrabold mb-1">Shopping List</h1>
        <p className="text-sm mb-4">{new Date().toLocaleDateString()}</p>
        <PrintableList items={items} />
        {plannedMeals.length > 0 && (
          <div className="mt-6">
            <h2 className="text-base font-bold mb-2">Dinners this week</h2>
            <ul className="text-sm space-y-1">
              {plannedMeals.map((s) => (
                <li key={s.day}><strong>{s.day}:</strong> {s.dinner}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
