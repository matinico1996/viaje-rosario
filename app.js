/**
 * ROSARIO REGIONAL 2026 – ORGANIZADOR DE VIAJE
 * Pokémon VGC Tournament Trip Organizer & Luggage Checklist
 * 
 * Arquitectura modular y reactiva basada en Vanilla JS,
 * con persistencia completa en localStorage y estados independientes.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURACIÓN INICIAL & DATOS MAESTROS ("lista items" & "pokemon viaje")
  // ==========================================================================

  // Los 14 integrantes oficiales del viaje
  const DEFAULT_MEMBERS = [
    {
      id: 'lisandro',
      name: 'Lisandro',
      photo: 'pokemon viaje/lisandro.jpg',
      isDriver: true
    },
    {
      id: 'juanma',
      name: 'Juanma',
      photo: 'pokemon viaje/juanma.jpg',
      isDriver: false
    },
    {
      id: 'mati-ahumada',
      name: 'Mati Ahumada',
      photo: 'pokemon viaje/mati ahumada.jpg',
      isDriver: false
    },
    {
      id: 'nico',
      name: 'Nico',
      photo: 'pokemon viaje/nico.jpg',
      isDriver: false
    },
    {
      id: 'kina',
      name: 'Kina',
      photo: 'pokemon viaje/kina.jpg',
      isDriver: false
    },
    {
      id: 'jon',
      name: 'Jon',
      photo: 'pokemon viaje/jon.jpg',
      isDriver: true
    },
    {
      id: 'romi',
      name: 'Romi',
      photo: 'pokemon viaje/romi.jpg',
      isDriver: false
    },
    {
      id: 'ariel',
      name: 'Ariel',
      photo: 'pokemon viaje/ariel.jpg',
      isDriver: false
    },
    {
      id: 'faculito',
      name: 'Faculito',
      photo: 'pokemon viaje/faculito.jpg',
      isDriver: false
    },
    {
      id: 'pau',
      name: 'Pau',
      photo: 'pokemon viaje/pau.jpg',
      isDriver: false
    },
    {
      id: 'pepo',
      name: 'Pepo',
      photo: 'pokemon viaje/pepo.jpg',
      isDriver: false
    },
    {
      id: 'joaco',
      name: 'Joaco',
      photo: 'pokemon viaje/Joaco.jpg',
      isDriver: false
    },
    {
      id: 'fran',
      name: 'Fran',
      photo: 'pokemon viaje/fran.jpg',
      isDriver: false
    },
    {
      id: 'valen',
      name: 'Valen',
      photo: 'pokemon viaje/valen.jpg',
      isDriver: false
    }
  ];

  // Categorías basadas estrictamente en "lista items"
  const DEFAULT_CATEGORIES = [
    { id: 'cat-doc', name: 'DOCUMENTACIÓN Y OBJETOS PERSONALES' },
    { id: 'cat-ropa', name: 'ROPA' },
    { id: 'cat-higiene', name: 'HIGIENE PERSONAL' },
    { id: 'cat-tecno', name: 'TECNOLOGÍA Y ACCESORIOS' },
    { id: 'cat-salud', name: 'SALUD Y COMODIDAD' }
  ];

  // Elementos basados estrictamente en "lista items"
  // Licencia de conducir es exclusivo para Lisandro y Jon
  const DEFAULT_ITEMS = [
    // DOCUMENTACIÓN Y OBJETOS PERSONALES
    { id: 'item-doc-1', categoryId: 'cat-doc', name: 'DNI físico.', exclusiveTo: [] },
    { id: 'item-doc-2', categoryId: 'cat-doc', name: 'Licencia de conducir (SOLO CONDUCTORES).', exclusiveTo: ['lisandro', 'jon'] },
    { id: 'item-doc-3', categoryId: 'cat-doc', name: 'billetera (Tarjetas bancarias y/o efectivo).', exclusiveTo: [] },
    { id: 'item-doc-4', categoryId: 'cat-doc', name: 'Carnet de obra social o prepaga.', exclusiveTo: [] },
    { id: 'item-doc-5', categoryId: 'cat-doc', name: 'Llaves de casa.', exclusiveTo: [] },
    { id: 'item-doc-6', categoryId: 'cat-doc', name: 'AUTORIZACIÓN DE MADRE PARA VIAJE', exclusiveTo: ['ariel'] },

    // ROPA
    { id: 'item-rop-1', categoryId: 'cat-ropa', name: '3 mudas de ropa interior.', exclusiveTo: [] },
    { id: 'item-rop-2', categoryId: 'cat-ropa', name: '3 pares de medias.', exclusiveTo: [] },
    { id: 'item-rop-3', categoryId: 'cat-ropa', name: '3 remeras.', exclusiveTo: [] },
    { id: 'item-rop-4', categoryId: 'cat-ropa', name: '1 pantalón largo.', exclusiveTo: [] },
    { id: 'item-rop-5', categoryId: 'cat-ropa', name: '1 pantalón corto o bermuda.', exclusiveTo: [] },
    { id: 'item-rop-6', categoryId: 'cat-ropa', name: '1 maya', exclusiveTo: [] },
    { id: 'item-rop-7', categoryId: 'cat-ropa', name: '1 conjunto cómodo para viajar.', exclusiveTo: [] },
    { id: 'item-rop-8', categoryId: 'cat-ropa', name: '1 buzo o campera liviana.', exclusiveTo: [] },
    { id: 'item-rop-9', categoryId: 'cat-ropa', name: '1 par de zapatillas cómodas.', exclusiveTo: [] },
    { id: 'item-rop-10', categoryId: 'cat-ropa', name: 'Ojotas .', exclusiveTo: [] },

    // HIGIENE PERSONAL
    { id: 'item-hig-1', categoryId: 'cat-higiene', name: 'Cepillo de dientes.', exclusiveTo: [] },
    { id: 'item-hig-2', categoryId: 'cat-higiene', name: 'Pasta dental.', exclusiveTo: [] },
    { id: 'item-hig-3', categoryId: 'cat-higiene', name: 'Desodorante.', exclusiveTo: [] },
    { id: 'item-hig-4', categoryId: 'cat-higiene', name: 'Shampoo.', exclusiveTo: [] },
    { id: 'item-hig-5', categoryId: 'cat-higiene', name: 'Acondicionador (opcional).', exclusiveTo: [] },
    { id: 'item-hig-6', categoryId: 'cat-higiene', name: 'Jabón.', exclusiveTo: [] },
    { id: 'item-hig-7', categoryId: 'cat-higiene', name: 'Peine o cepillo.', exclusiveTo: [] },
    { id: 'item-hig-8', categoryId: 'cat-higiene', name: 'Toalla (si el alojamiento no proporciona).', exclusiveTo: [] },
    { id: 'item-hig-9', categoryId: 'cat-higiene', name: 'Protector solar.', exclusiveTo: [] },
    { id: 'item-hig-10', categoryId: 'cat-higiene', name: 'Perfume .', exclusiveTo: [] },
    { id: 'item-hig-11', categoryId: 'cat-higiene', name: 'Máquina de afeitar (si corresponde).', exclusiveTo: [] },
    { id: 'item-hig-12', categoryId: 'cat-higiene', name: 'Productos de cuidado personal habituales.', exclusiveTo: [] },
    { id: 'item-hig-13', categoryId: 'cat-higiene', name: 'Pañuelos descartables.', exclusiveTo: [] },
    { id: 'item-hig-14', categoryId: 'cat-higiene', name: 'Alcohol en gel.', exclusiveTo: [] },

    // TECNOLOGÍA Y ACCESORIOS
    { id: 'item-tec-1', categoryId: 'cat-tecno', name: 'Celular.', exclusiveTo: [] },
    { id: 'item-tec-2', categoryId: 'cat-tecno', name: 'Cargador del celular.', exclusiveTo: [] },
    { id: 'item-tec-3', categoryId: 'cat-tecno', name: 'Cable USB-C o Lightning correspondiente.', exclusiveTo: [] },
    { id: 'item-tec-4', categoryId: 'cat-tecno', name: 'Power bank.', exclusiveTo: [] },
    { id: 'item-tec-5', categoryId: 'cat-tecno', name: 'Auriculares.', exclusiveTo: [] },
    { id: 'item-tec-6', categoryId: 'cat-tecno', name: 'Adaptador múltiple o zapatilla eléctrica.', exclusiveTo: [] },
    { id: 'item-tec-7', categoryId: 'cat-tecno', name: 'Cable extra de carga.', exclusiveTo: [] },

    // SALUD Y COMODIDAD
    { id: 'item-sal-1', categoryId: 'cat-salud', name: 'Medicamentos personales habituales.', exclusiveTo: [] },
    { id: 'item-sal-2', categoryId: 'cat-salud', name: 'Analgésico de uso habitual.', exclusiveTo: [] },
    { id: 'item-sal-3', categoryId: 'cat-salud', name: 'Curitas.', exclusiveTo: [] },
    { id: 'item-sal-4', categoryId: 'cat-salud', name: 'Repelente de mosquitos.', exclusiveTo: [] },
    { id: 'item-sal-5', categoryId: 'cat-salud', name: 'Lentes recetados o de contacto (si corresponde).', exclusiveTo: [] },
    { id: 'item-sal-6', categoryId: 'cat-salud', name: 'protector solar.', exclusiveTo: [] }
  ];

  // Claves de LocalStorage
  const MASTER_STORAGE_KEY = 'rosario_2026_master_config_v3';
  const CHECKLIST_STORAGE_PREFIX = 'rosario_2026_checklist_v3_';

  // ==========================================================================
  // 2. GESTIÓN DEL ESTADO GLOBAL & LOCALSTORAGE
  // ==========================================================================

  let masterState = loadMasterState();
  let currentMemberId = null;
  let currentMemberChecklist = null; // { categories: [], items: [] }
  let currentFilter = 'all'; // 'all' | 'pending' | 'completed'
  let currentSearchQuery = '';

  /**
   * Carga o inicializa los datos maestros (integrantes, categorías, ítems globales).
   */
  function loadMasterState() {
    try {
      const stored = localStorage.getItem(MASTER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error al leer datos maestros de localStorage:', e);
    }
    // Si no existe, inicializar con los valores por defecto
    const initial = {
      members: JSON.parse(JSON.stringify(DEFAULT_MEMBERS)),
      categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
      items: JSON.parse(JSON.stringify(DEFAULT_ITEMS))
    };
    saveMasterState(initial);
    return initial;
  }

  function saveMasterState(state) {
    try {
      localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(state));
      masterState = state;
    } catch (e) {
      console.error('Error al guardar datos maestros en localStorage:', e);
    }
  }

  /**
   * Carga o crea la checklist personal independiente de un integrante.
   */
  function loadMemberChecklist(memberId) {
    const storageKey = CHECKLIST_STORAGE_PREFIX + memberId;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validar que tenga estructura correcta
        if (parsed && Array.isArray(parsed.categories) && Array.isArray(parsed.items)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(`Error al leer checklist de ${memberId}:`, e);
    }

    // Si no existe todavía, generar la checklist inicial desde la plantilla maestra
    return createInitialMemberChecklist(memberId);
  }

  /**
   * Crea una nueva checklist independiente a partir de los datos maestros,
   * filtrando los elementos exclusivos según el ID del integrante.
   */
  function createInitialMemberChecklist(memberId) {
    // Categorías maestras
    const categories = masterState.categories.map(c => ({ ...c }));

    // Filtrar elementos visibles para este integrante:
    // Visible si exclusiveTo está vacío o si incluye a este memberId
    const items = masterState.items
      .filter(item => {
        if (!item.exclusiveTo || item.exclusiveTo.length === 0) return true;
        return item.exclusiveTo.includes(memberId);
      })
      .map(item => ({
        id: item.id,
        categoryId: item.categoryId,
        name: item.name,
        completed: false,
        isCustom: false,
        exclusiveTo: item.exclusiveTo ? [...item.exclusiveTo] : []
      }));

    const checklist = { categories, items };
    saveMemberChecklist(memberId, checklist);
    return checklist;
  }

  function saveMemberChecklist(memberId, checklist) {
    const storageKey = CHECKLIST_STORAGE_PREFIX + memberId;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checklist));
    } catch (e) {
      console.error(`Error al guardar checklist de ${memberId}:`, e);
    }
  }

  // ==========================================================================
  // 3. UTILIDADES VISUALES & AVATARES
  // ==========================================================================

  function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // ==========================================================================
  // 4. RENDERIZADO: PÁGINA PRINCIPAL (14 TARJETAS)
  // ==========================================================================

  function renderHomeView() {
    const gridContainer = document.getElementById('members-grid-container');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    masterState.members.forEach((member, index) => {
      const card = document.createElement('a');
      card.href = `#/${member.id}`;
      card.className = 'member-card';
      card.setAttribute('data-member-id', member.id);
      card.setAttribute('aria-label', `Ver checklist de ${member.name}`);

      // Contenedor de fotografía con proporción cuadrada y recorte centrado
      const photoWrapper = document.createElement('div');
      photoWrapper.className = 'member-card-photo-wrapper';

      const img = document.createElement('img');
      img.src = member.photo;
      img.alt = `Fotografía de ${member.name}`;
      img.className = 'member-card-photo';
      img.loading = 'lazy';

      // Fallback con avatar provisional e iniciales si la imagen fallara
      const fallback = document.createElement('div');
      fallback.className = 'avatar-fallback hidden';
      fallback.textContent = getInitials(member.name);

      img.onerror = function () {
        this.classList.add('hidden');
        fallback.classList.remove('hidden');
      };

      photoWrapper.appendChild(img);
      photoWrapper.appendChild(fallback);

      // Nombre del integrante
      const nameEl = document.createElement('h3');
      nameEl.className = 'member-card-name';
      nameEl.textContent = member.name;

      // Indicador de acción sutil
      const actionEl = document.createElement('div');
      actionEl.className = 'member-card-action';
      actionEl.innerHTML = `
        <span>Abrir checklist</span>
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;

      card.appendChild(photoWrapper);
      card.appendChild(nameEl);
      card.appendChild(actionEl);

      // Click listener para navegación fluida
      card.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = `/${member.id}`;
      });

      gridContainer.appendChild(card);
    });
  }

  // ==========================================================================
  // 5. RENDERIZADO: PÁGINA INDIVIDUAL DEL INTEGRANTE
  // ==========================================================================

  function renderMemberView(memberId) {
    const member = masterState.members.find(m => m.id === memberId);
    if (!member) {
      window.location.hash = '#/';
      return;
    }

    currentMemberId = memberId;
    currentMemberChecklist = loadMemberChecklist(memberId);

    // Actualizar Encabezado del Perfil
    const profileName = document.getElementById('profile-name');
    const profilePhoto = document.getElementById('profile-photo');
    const profileFallback = document.getElementById('profile-avatar-fallback');

    if (profileName) profileName.textContent = member.name;

    if (profilePhoto && profileFallback) {
      profilePhoto.classList.remove('hidden');
      profileFallback.classList.add('hidden');
      profilePhoto.src = member.photo;
      profilePhoto.alt = `Fotografía de ${member.name}`;
      profileFallback.textContent = getInitials(member.name);
    }

    // Resetear filtros locales
    currentFilter = 'all';
    currentSearchQuery = '';
    const searchInput = document.getElementById('checklist-search');
    if (searchInput) searchInput.value = '';
    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');

    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === 'all');
    });

    // Renderizar lista de categorías e ítems
    updateChecklistDisplay();
  }

  /**
   * Actualiza el progreso numérico y el DOM de la checklist
   */
  function updateChecklistDisplay() {
    if (!currentMemberChecklist) return;

    // 1. Calcular estadísticas de progreso
    const totalItems = currentMemberChecklist.items.length;
    const completedItems = currentMemberChecklist.items.filter(i => i.completed).length;
    const pendingItems = totalItems - completedItems;
    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    // Actualizar elementos de la interfaz de progreso
    const percentEl = document.getElementById('progress-percentage-text');
    const fillBarEl = document.getElementById('progress-fill-bar');
    const totalEl = document.getElementById('stat-total-count');
    const completedEl = document.getElementById('stat-completed-count');
    const pendingEl = document.getElementById('stat-pending-count');

    if (percentEl) percentEl.textContent = `${percentage}%`;
    if (fillBarEl) fillBarEl.style.width = `${percentage}%`;
    if (totalEl) totalEl.textContent = totalItems;
    if (completedEl) completedEl.textContent = completedItems;
    if (pendingEl) pendingEl.textContent = pendingItems;

    // 2. Renderizar contenedor de categorías
    const container = document.getElementById('checklist-categories-container');
    if (!container) return;
    container.innerHTML = '';

    const query = currentSearchQuery.trim().toLowerCase();

    // Iterar categorías en el orden actual
    currentMemberChecklist.categories.forEach((category, catIndex) => {
      // Filtrar ítems de esta categoría
      const categoryItems = currentMemberChecklist.items.filter(item => item.categoryId === category.id);

      // Aplicar filtros de búsqueda y estado
      const filteredItems = categoryItems.filter(item => {
        // Filtro por texto
        if (query && !item.name.toLowerCase().includes(query)) {
          return false;
        }
        // Filtro por pestaña
        if (currentFilter === 'pending' && item.completed) return false;
        if (currentFilter === 'completed' && !item.completed) return false;
        return true;
      });

      // Si hay una búsqueda activa y no hay coincidencias, omitir la categoría
      if (query && filteredItems.length === 0) {
        return;
      }

      // Card de Categoría
      const catCard = document.createElement('div');
      catCard.className = 'category-card';
      catCard.setAttribute('data-category-id', category.id);

      // Header de Categoría
      const catHeader = document.createElement('div');
      catHeader.className = 'category-header';

      const titleArea = document.createElement('div');
      titleArea.className = 'category-title-area';

      const catBadge = document.createElement('div');
      catBadge.className = 'category-badge-icon';
      catBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

      const titleEl = document.createElement('h3');
      titleEl.className = 'category-title';
      titleEl.textContent = category.name;

      const catCompletedCount = categoryItems.filter(i => i.completed).length;
      const statsBadge = document.createElement('span');
      statsBadge.className = `category-stats-badge ${catCompletedCount === categoryItems.length && categoryItems.length > 0 ? 'completed' : ''}`;
      statsBadge.textContent = `${catCompletedCount}/${categoryItems.length}`;

      titleArea.appendChild(catBadge);
      titleArea.appendChild(titleEl);
      titleArea.appendChild(statsBadge);

      // Acciones de Categoría (Reordenar, Renombrar, Eliminar, Agregar ítem)
      const actionsArea = document.createElement('div');
      actionsArea.className = 'category-actions';

      // Botón Subir Categoría
      if (catIndex > 0) {
        const btnMoveUp = document.createElement('button');
        btnMoveUp.className = 'btn-icon-tiny';
        btnMoveUp.title = 'Subir categoría';
        btnMoveUp.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
        btnMoveUp.onclick = (e) => {
          e.stopPropagation();
          reorderCategory(catIndex, catIndex - 1);
        };
        actionsArea.appendChild(btnMoveUp);
      }

      // Botón Bajar Categoría
      if (catIndex < currentMemberChecklist.categories.length - 1) {
        const btnMoveDown = document.createElement('button');
        btnMoveDown.className = 'btn-icon-tiny';
        btnMoveDown.title = 'Bajar categoría';
        btnMoveDown.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        btnMoveDown.onclick = (e) => {
          e.stopPropagation();
          reorderCategory(catIndex, catIndex + 1);
        };
        actionsArea.appendChild(btnMoveDown);
      }

      // Botón Agregar ítem a esta categoría
      const btnAddInCat = document.createElement('button');
      btnAddInCat.className = 'btn-icon-tiny';
      btnAddInCat.title = 'Agregar elemento a esta categoría';
      btnAddInCat.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
      btnAddInCat.onclick = (e) => {
        e.stopPropagation();
        openItemModal('add', null, category.id);
      };
      actionsArea.appendChild(btnAddInCat);

      // Botón Editar nombre de categoría
      const btnEditCat = document.createElement('button');
      btnEditCat.className = 'btn-icon-tiny';
      btnEditCat.title = 'Modificar nombre de categoría';
      btnEditCat.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
      btnEditCat.onclick = (e) => {
        e.stopPropagation();
        openCategoryModal('edit', category.id);
      };
      actionsArea.appendChild(btnEditCat);

      // Botón Eliminar categoría
      const btnDeleteCat = document.createElement('button');
      btnDeleteCat.className = 'btn-icon-tiny btn-delete-cat';
      btnDeleteCat.title = 'Eliminar categoría';
      btnDeleteCat.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
      btnDeleteCat.onclick = (e) => {
        e.stopPropagation();
        confirmAction(
          'Eliminar categoría',
          `¿Querés eliminar la categoría "${category.name}" y todos sus elementos asociados en tu checklist?`,
          () => deleteCategory(category.id)
        );
      };
      actionsArea.appendChild(btnDeleteCat);

      catHeader.appendChild(titleArea);
      catHeader.appendChild(actionsArea);
      catCard.appendChild(catHeader);

      // Lista de Elementos
      const itemsList = document.createElement('div');
      itemsList.className = 'category-items-list';

      if (filteredItems.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-category-message';
        emptyMsg.textContent = categoryItems.length === 0
          ? 'Esta categoría todavía no tiene elementos.'
          : 'No hay elementos que coincidan con los filtros aplicados.';
        itemsList.appendChild(emptyMsg);
      } else {
        filteredItems.forEach((item, itemIdx) => {
          const itemRow = document.createElement('div');
          itemRow.className = `item-row ${item.completed ? 'completed' : ''}`;
          itemRow.setAttribute('data-item-id', item.id);

          // Área clickeable para completar / desmarcar
          const mainClickable = document.createElement('div');
          mainClickable.className = 'item-main-clickable';

          // Checkbox estilizado
          const checkboxWrapper = document.createElement('div');
          checkboxWrapper.className = 'custom-checkbox-wrapper';
          const checkboxBox = document.createElement('div');
          checkboxBox.className = 'custom-checkbox-box';
          checkboxBox.innerHTML = `
            <svg class="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          checkboxWrapper.appendChild(checkboxBox);

          // Nombre y Badges
          const nameArea = document.createElement('div');
          nameArea.className = 'item-name-area';

          const nameSpan = document.createElement('span');
          nameSpan.className = 'item-name';
          nameSpan.textContent = item.name;
          nameArea.appendChild(nameSpan);

          // Badge si es un elemento personalizado agregado por el usuario
          if (item.isCustom) {
            const customBadge = document.createElement('span');
            customBadge.className = 'item-custom-badge';
            customBadge.textContent = 'Personalizado';
            nameArea.appendChild(customBadge);
          }

          mainClickable.appendChild(checkboxWrapper);
          mainClickable.appendChild(nameArea);

          // Evento de clic: Marcar / Desmarcar
          mainClickable.addEventListener('click', () => {
            toggleItemCompletion(item.id);
          });

          // Acciones individuales del ítem (Subir, Bajar, Editar, Eliminar)
          const itemActions = document.createElement('div');
          itemActions.className = 'item-actions';

          // Subir ítem dentro de la categoría
          if (itemIdx > 0) {
            const btnItemUp = document.createElement('button');
            btnItemUp.className = 'btn-icon-tiny';
            btnItemUp.title = 'Mover hacia arriba';
            btnItemUp.innerHTML = `<svg style="width: 12px; height: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
            btnItemUp.onclick = (e) => {
              e.stopPropagation();
              reorderItem(item.id, 'up');
            };
            itemActions.appendChild(btnItemUp);
          }

          // Bajar ítem dentro de la categoría
          if (itemIdx < filteredItems.length - 1) {
            const btnItemDown = document.createElement('button');
            btnItemDown.className = 'btn-icon-tiny';
            btnItemDown.title = 'Mover hacia abajo';
            btnItemDown.innerHTML = `<svg style="width: 12px; height: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            btnItemDown.onclick = (e) => {
              e.stopPropagation();
              reorderItem(item.id, 'down');
            };
            itemActions.appendChild(btnItemDown);
          }

          // Editar elemento
          const btnEditItem = document.createElement('button');
          btnEditItem.className = 'btn-icon-tiny';
          btnEditItem.title = 'Editar elemento';
          btnEditItem.innerHTML = `<svg style="width: 12px; height: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
          btnEditItem.onclick = (e) => {
            e.stopPropagation();
            openItemModal('edit', item.id);
          };
          itemActions.appendChild(btnEditItem);

          // Eliminar elemento
          const btnDeleteItem = document.createElement('button');
          btnDeleteItem.className = 'btn-icon-tiny btn-delete-cat';
          btnDeleteItem.title = 'Eliminar elemento';
          btnDeleteItem.innerHTML = `<svg style="width: 12px; height: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
          btnDeleteItem.onclick = (e) => {
            e.stopPropagation();
            deleteItem(item.id);
          };
          itemActions.appendChild(btnDeleteItem);

          itemRow.appendChild(mainClickable);
          itemRow.appendChild(itemActions);
          itemsList.appendChild(itemRow);
        });
      }

      catCard.appendChild(itemsList);
      container.appendChild(catCard);
    });
  }

  // ==========================================================================
  // 6. OPERACIONES DE LA CHECKLIST DEL INTEGRANTE
  // ==========================================================================

  function toggleItemCompletion(itemId) {
    if (!currentMemberChecklist || !currentMemberId) return;

    const item = currentMemberChecklist.items.find(i => i.id === itemId);
    if (!item) return;

    item.completed = !item.completed;
    saveMemberChecklist(currentMemberId, currentMemberChecklist);
    updateChecklistDisplay();

    // Feedback sonoro o sutil toast si completó
    if (item.completed) {
      showToast(`¡Listo! "${item.name}" empacado.`, 'success');
    }
  }

  function deleteItem(itemId) {
    if (!currentMemberChecklist || !currentMemberId) return;

    const item = currentMemberChecklist.items.find(i => i.id === itemId);
    const itemName = item ? item.name : 'Elemento';

    currentMemberChecklist.items = currentMemberChecklist.items.filter(i => i.id !== itemId);
    saveMemberChecklist(currentMemberId, currentMemberChecklist);
    updateChecklistDisplay();
    showToast(`"${itemName}" eliminado de tu lista.`, 'info');
  }

  function reorderItem(itemId, direction) {
    if (!currentMemberChecklist || !currentMemberId) return;

    const itemIndex = currentMemberChecklist.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    const currentItem = currentMemberChecklist.items[itemIndex];
    // Encontrar el ítem adyacente dentro de la MISMA categoría
    const sameCatIndices = [];
    currentMemberChecklist.items.forEach((it, idx) => {
      if (it.categoryId === currentItem.categoryId) {
        sameCatIndices.push(idx);
      }
    });

    const posInCat = sameCatIndices.indexOf(itemIndex);
    if (direction === 'up' && posInCat > 0) {
      const targetIndex = sameCatIndices[posInCat - 1];
      // Intercambiar
      const temp = currentMemberChecklist.items[itemIndex];
      currentMemberChecklist.items[itemIndex] = currentMemberChecklist.items[targetIndex];
      currentMemberChecklist.items[targetIndex] = temp;
    } else if (direction === 'down' && posInCat < sameCatIndices.length - 1) {
      const targetIndex = sameCatIndices[posInCat + 1];
      // Intercambiar
      const temp = currentMemberChecklist.items[itemIndex];
      currentMemberChecklist.items[itemIndex] = currentMemberChecklist.items[targetIndex];
      currentMemberChecklist.items[targetIndex] = temp;
    }

    saveMemberChecklist(currentMemberId, currentMemberChecklist);
    updateChecklistDisplay();
  }

  function reorderCategory(fromIndex, toIndex) {
    if (!currentMemberChecklist || !currentMemberId) return;
    if (toIndex < 0 || toIndex >= currentMemberChecklist.categories.length) return;

    const temp = currentMemberChecklist.categories[fromIndex];
    currentMemberChecklist.categories[fromIndex] = currentMemberChecklist.categories[toIndex];
    currentMemberChecklist.categories[toIndex] = temp;

    saveMemberChecklist(currentMemberId, currentMemberChecklist);
    updateChecklistDisplay();
  }

  function deleteCategory(categoryId) {
    if (!currentMemberChecklist || !currentMemberId) return;

    currentMemberChecklist.categories = currentMemberChecklist.categories.filter(c => c.id !== categoryId);
    currentMemberChecklist.items = currentMemberChecklist.items.filter(i => i.categoryId !== categoryId);

    saveMemberChecklist(currentMemberId, currentMemberChecklist);
    updateChecklistDisplay();
    showToast('Categoría eliminada.', 'info');
  }

  function resetCurrentMemberChecklist() {
    if (!currentMemberId) return;

    confirmAction(
      'Reiniciar checklist',
      '¿Querés restablecer tu checklist a los valores iniciales de la lista de viaje? Se perderán los elementos personalizados que hayas agregado.',
      () => {
        currentMemberChecklist = createInitialMemberChecklist(currentMemberId);
        updateChecklistDisplay();
        showToast('Checklist restablecida con éxito.', 'success');
      }
    );
  }

  // ==========================================================================
  // 7. PANEL DE ADMINISTRACIÓN (GESTIÓN INTEGRANTES, CATEGORÍAS Y MAESTROS)
  // ==========================================================================

  // Contraseña de acceso a la Administración (solo conocida por el organizador)
  const ADMIN_PASSWORD = 'tala';

  function promptAdminAuth() {
    const modal = document.getElementById('admin-auth-modal');
    const input = document.getElementById('admin-password-input');
    const errorEl = document.getElementById('admin-auth-error');
    if (!modal) return;
    if (input) input.value = '';
    if (errorEl) errorEl.classList.add('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => {
      if (input) input.focus();
    }, 60);
  }

  function closeAdminAuthModal() {
    const modal = document.getElementById('admin-auth-modal');
    if (modal) modal.classList.add('hidden');
  }

  function openAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;
    renderAdminMembers();
    renderAdminCategories();
    renderAdminItems();
    populateAdminCategoryFilter();
    modal.classList.remove('hidden');
  }

  function closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.classList.add('hidden');
    // Si estamos en la home, refrescar la cuadrícula
    if (!currentMemberId) {
      renderHomeView();
    } else {
      // Si estamos en un miembro, refrescar
      renderMemberView(currentMemberId);
    }
  }

  // --- Pestaña 1: Integrantes ---
  function renderAdminMembers() {
    const container = document.getElementById('admin-members-list');
    if (!container) return;
    container.innerHTML = '';

    masterState.members.forEach((member, index) => {
      const row = document.createElement('div');
      row.className = 'admin-list-row';

      const left = document.createElement('div');
      left.className = 'admin-row-left';

      const img = document.createElement('img');
      img.src = member.photo;
      img.className = 'admin-row-avatar';
      img.alt = member.name;
      img.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23334155"/><text x="50" y="55" fill="%23fff" font-size="30" text-anchor="middle" dominant-baseline="middle">?</text></svg>';
      };

      const titleArea = document.createElement('div');
      titleArea.className = 'admin-row-title-area';

      const nameEl = document.createElement('div');
      nameEl.className = 'admin-row-name';
      nameEl.textContent = `${index + 1}. ${member.name}`;

      const metaEl = document.createElement('div');
      metaEl.className = 'admin-row-meta';
      metaEl.innerHTML = `
        <span>ID: ${member.id}</span>
        <span>• Archivo: ${member.photo}</span>
      `;

      titleArea.appendChild(nameEl);
      titleArea.appendChild(metaEl);

      left.appendChild(img);
      left.appendChild(titleArea);

      // Acciones
      const actions = document.createElement('div');
      actions.className = 'admin-row-actions';

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn btn-secondary btn-sm';
      btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => openMemberModal('edit', member.id);

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn btn-outline-danger btn-sm';
      btnDelete.textContent = 'Eliminar';
      btnDelete.onclick = () => {
        confirmAction(
          'Eliminar Integrante',
          `¿Estás seguro de eliminar a ${member.name}?`,
          () => {
            masterState.members = masterState.members.filter(m => m.id !== member.id);
            saveMasterState(masterState);
            renderAdminMembers();
            renderHomeView();
            showToast(`${member.name} eliminado.`, 'info');
          }
        );
      };

      actions.appendChild(btnEdit);
      actions.appendChild(btnDelete);

      row.appendChild(left);
      row.appendChild(actions);
      container.appendChild(row);
    });
  }

  // --- Pestaña 2: Categorías Maestras ---
  function renderAdminCategories() {
    const container = document.getElementById('admin-categories-list');
    if (!container) return;
    container.innerHTML = '';

    masterState.categories.forEach((cat, index) => {
      const row = document.createElement('div');
      row.className = 'admin-list-row';

      const left = document.createElement('div');
      left.className = 'admin-row-left';

      const titleArea = document.createElement('div');
      titleArea.className = 'admin-row-title-area';

      const nameEl = document.createElement('div');
      nameEl.className = 'admin-row-name';
      nameEl.textContent = `${index + 1}. ${cat.name}`;

      const itemCount = masterState.items.filter(i => i.categoryId === cat.id).length;
      const metaEl = document.createElement('div');
      metaEl.className = 'admin-row-meta';
      metaEl.textContent = `${itemCount} elementos maestros asociados`;

      titleArea.appendChild(nameEl);
      titleArea.appendChild(metaEl);
      left.appendChild(titleArea);

      // Acciones (Subir, Bajar, Editar, Eliminar)
      const actions = document.createElement('div');
      actions.className = 'admin-row-actions';

      if (index > 0) {
        const btnUp = document.createElement('button');
        btnUp.className = 'btn-icon-tiny';
        btnUp.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
        btnUp.onclick = () => {
          const temp = masterState.categories[index];
          masterState.categories[index] = masterState.categories[index - 1];
          masterState.categories[index - 1] = temp;
          saveMasterState(masterState);
          renderAdminCategories();
        };
        actions.appendChild(btnUp);
      }

      if (index < masterState.categories.length - 1) {
        const btnDown = document.createElement('button');
        btnDown.className = 'btn-icon-tiny';
        btnDown.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        btnDown.onclick = () => {
          const temp = masterState.categories[index];
          masterState.categories[index] = masterState.categories[index + 1];
          masterState.categories[index + 1] = temp;
          saveMasterState(masterState);
          renderAdminCategories();
        };
        actions.appendChild(btnDown);
      }

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn btn-secondary btn-sm';
      btnEdit.textContent = 'Renombrar';
      btnEdit.onclick = () => openCategoryModal('edit', cat.id, 'admin');

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn btn-outline-danger btn-sm';
      btnDelete.textContent = 'Eliminar';
      btnDelete.onclick = () => {
        confirmAction(
          'Eliminar Categoría Maestra',
          `¿Eliminar la categoría "${cat.name}"? Los elementos maestros en esta categoría también se eliminarán.`,
          () => {
            masterState.categories = masterState.categories.filter(c => c.id !== cat.id);
            masterState.items = masterState.items.filter(i => i.categoryId !== cat.id);
            saveMasterState(masterState);
            renderAdminCategories();
            renderAdminItems();
            populateAdminCategoryFilter();
            showToast('Categoría maestra eliminada.', 'info');
          }
        );
      };

      actions.appendChild(btnEdit);
      actions.appendChild(btnDelete);

      row.appendChild(left);
      row.appendChild(actions);
      container.appendChild(row);
    });
  }

  // --- Pestaña 3: Elementos Maestros & Exclusividad ---
  function populateAdminCategoryFilter() {
    const select = document.getElementById('admin-item-cat-filter');
    if (!select) return;
    const currentVal = select.value;
    select.innerHTML = '<option value="all">Todas las categorías</option>';

    masterState.categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      select.appendChild(opt);
    });

    if (currentVal) select.value = currentVal;
  }

  function renderAdminItems() {
    const container = document.getElementById('admin-items-list');
    if (!container) return;
    container.innerHTML = '';

    const filterCat = document.getElementById('admin-item-cat-filter')?.value || 'all';

    const itemsToDisplay = masterState.items.filter(item => {
      if (filterCat !== 'all' && item.categoryId !== filterCat) return false;
      return true;
    });

    if (itemsToDisplay.length === 0) {
      container.innerHTML = '<p class="empty-category-message">No hay elementos en esta categoría.</p>';
      return;
    }

    itemsToDisplay.forEach((item, index) => {
      const cat = masterState.categories.find(c => c.id === item.categoryId);
      const catName = cat ? cat.name : 'Sin categoría';

      const row = document.createElement('div');
      row.className = 'admin-list-row';

      const left = document.createElement('div');
      left.className = 'admin-row-left';

      const titleArea = document.createElement('div');
      titleArea.className = 'admin-row-title-area';

      const nameEl = document.createElement('div');
      nameEl.className = 'admin-row-name';
      nameEl.textContent = item.name;

      const metaEl = document.createElement('div');
      metaEl.className = 'admin-row-meta';

      let exclusiveText = 'Visible para todos';
      if (item.exclusiveTo && item.exclusiveTo.length > 0) {
        const names = item.exclusiveTo.map(id => {
          const m = masterState.members.find(x => x.id === id);
          return m ? m.name : id;
        }).join(', ');
        exclusiveText = `🔒 Exclusivo para: ${names}`;
      }

      metaEl.innerHTML = `
        <span>📂 ${catName}</span>
        <span>•</span>
        <span style="${item.exclusiveTo && item.exclusiveTo.length > 0 ? 'color: var(--poke-gold); font-weight: 600;' : ''}">${exclusiveText}</span>
      `;

      titleArea.appendChild(nameEl);
      titleArea.appendChild(metaEl);
      left.appendChild(titleArea);

      // Acciones
      const actions = document.createElement('div');
      actions.className = 'admin-row-actions';

      // Subir / Bajar ítem en master
      if (index > 0) {
        const btnUp = document.createElement('button');
        btnUp.className = 'btn-icon-tiny';
        btnUp.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
        btnUp.onclick = () => {
          const globalIdx = masterState.items.findIndex(i => i.id === item.id);
          const prevItem = itemsToDisplay[index - 1];
          const prevGlobalIdx = masterState.items.findIndex(i => i.id === prevItem.id);
          const temp = masterState.items[globalIdx];
          masterState.items[globalIdx] = masterState.items[prevGlobalIdx];
          masterState.items[prevGlobalIdx] = temp;
          saveMasterState(masterState);
          renderAdminItems();
        };
        actions.appendChild(btnUp);
      }

      if (index < itemsToDisplay.length - 1) {
        const btnDown = document.createElement('button');
        btnDown.className = 'btn-icon-tiny';
        btnDown.innerHTML = `<svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        btnDown.onclick = () => {
          const globalIdx = masterState.items.findIndex(i => i.id === item.id);
          const nextItem = itemsToDisplay[index + 1];
          const nextGlobalIdx = masterState.items.findIndex(i => i.id === nextItem.id);
          const temp = masterState.items[globalIdx];
          masterState.items[globalIdx] = masterState.items[nextGlobalIdx];
          masterState.items[nextGlobalIdx] = temp;
          saveMasterState(masterState);
          renderAdminItems();
        };
        actions.appendChild(btnDown);
      }

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn btn-secondary btn-sm';
      btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => openItemModal('edit', item.id, item.categoryId, 'admin');

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn btn-outline-danger btn-sm';
      btnDelete.textContent = 'Eliminar';
      btnDelete.onclick = () => {
        confirmAction(
          'Eliminar Elemento Maestro',
          `¿Eliminar "${item.name}" de la lista maestra?`,
          () => {
            masterState.items = masterState.items.filter(i => i.id !== item.id);
            saveMasterState(masterState);
            renderAdminItems();
            showToast('Elemento maestro eliminado.', 'info');
          }
        );
      };

      actions.appendChild(btnEdit);
      actions.appendChild(btnDelete);

      row.appendChild(left);
      row.appendChild(actions);
      container.appendChild(row);
    });
  }

  // ==========================================================================
  // 8. MODAL DE ELEMENTO (AGREGAR / EDITAR)
  // ==========================================================================

  function openItemModal(mode = 'add', itemId = null, defaultCatId = null, context = 'member') {
    const modal = document.getElementById('item-modal');
    const form = document.getElementById('item-form');
    const titleEl = document.getElementById('item-modal-title');
    const idInput = document.getElementById('item-form-id');
    const contextInput = document.getElementById('item-form-context');
    const nameInput = document.getElementById('item-form-name');
    const catSelect = document.getElementById('item-form-category');
    const exclusivitySection = document.getElementById('item-exclusivity-section');
    const selectiveBox = document.getElementById('item-selective-members-box');
    const membersCheckboxList = document.getElementById('item-members-checkbox-list');

    if (!modal || !form) return;

    form.reset();
    idInput.value = itemId || '';
    contextInput.value = context;

    // Llenar categorías disponibles
    catSelect.innerHTML = '';
    const categoriesSource = (context === 'admin' || !currentMemberChecklist)
      ? masterState.categories
      : currentMemberChecklist.categories;

    categoriesSource.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      catSelect.appendChild(opt);
    });

    // En contexto admin, se puede configurar la exclusividad
    // En contexto member, es un ítem personal
    if (context === 'admin') {
      exclusivitySection.classList.remove('hidden');
      // Renderizar checkboxes de integrantes
      membersCheckboxList.innerHTML = '';
      masterState.members.forEach(m => {
        const label = document.createElement('label');
        label.className = 'member-checkbox-item';
        label.innerHTML = `
          <input type="checkbox" name="exclusive-member" value="${m.id}">
          <span>${m.name} ${m.isDriver ? '(🚗)' : ''}</span>
        `;
        membersCheckboxList.appendChild(label);
      });
    } else {
      exclusivitySection.classList.add('hidden');
    }

    if (mode === 'edit' && itemId) {
      titleEl.textContent = 'Editar Elemento';
      let item = null;

      if (context === 'admin') {
        item = masterState.items.find(i => i.id === itemId);
      } else {
        item = currentMemberChecklist.items.find(i => i.id === itemId);
      }

      if (item) {
        nameInput.value = item.name;
        catSelect.value = item.categoryId;

        if (context === 'admin') {
          const isSelective = item.exclusiveTo && item.exclusiveTo.length > 0;
          const radioAll = form.querySelector('input[name="item-visibility-mode"][value="all"]');
          const radioSel = form.querySelector('input[name="item-visibility-mode"][value="selective"]');
          if (isSelective) {
            radioSel.checked = true;
            selectiveBox.classList.remove('hidden');
            item.exclusiveTo.forEach(mId => {
              const chk = form.querySelector(`input[name="exclusive-member"][value="${mId}"]`);
              if (chk) chk.checked = true;
            });
          } else {
            radioAll.checked = true;
            selectiveBox.classList.add('hidden');
          }
        }
      }
    } else {
      titleEl.textContent = 'Agregar Elemento';
      if (defaultCatId) {
        catSelect.value = defaultCatId;
      }
      form.querySelector('input[name="item-visibility-mode"][value="all"]').checked = true;
      selectiveBox.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    nameInput.focus();
  }

  function closeItemModal() {
    const modal = document.getElementById('item-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================================================
  // 9. MODAL DE CATEGORÍA (AGREGAR / EDITAR)
  // ==========================================================================

  function openCategoryModal(mode = 'add', catId = null, context = 'member') {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    const titleEl = document.getElementById('category-modal-title');
    const idInput = document.getElementById('category-form-id');
    const contextInput = document.getElementById('category-form-context');
    const nameInput = document.getElementById('category-form-name');

    if (!modal || !form) return;

    form.reset();
    idInput.value = catId || '';
    contextInput.value = context;

    if (mode === 'edit' && catId) {
      titleEl.textContent = 'Modificar Nombre de Categoría';
      let category = null;
      if (context === 'admin') {
        category = masterState.categories.find(c => c.id === catId);
      } else {
        category = currentMemberChecklist.categories.find(c => c.id === catId);
      }
      if (category) nameInput.value = category.name;
    } else {
      titleEl.textContent = 'Nueva Categoría';
    }

    modal.classList.remove('hidden');
    nameInput.focus();
  }

  function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================================================
  // 10. MODAL DE INTEGRANTE (AGREGAR / EDITAR EN ADMIN)
  // ==========================================================================

  function openMemberModal(mode = 'add', memberId = null) {
    const modal = document.getElementById('member-modal');
    const form = document.getElementById('member-form');
    const titleEl = document.getElementById('member-modal-title');
    const idInput = document.getElementById('member-form-id');
    const nameInput = document.getElementById('member-form-name');
    const photoInput = document.getElementById('member-form-photo');
    const driverInput = document.getElementById('member-form-is-driver');

    if (!modal || !form) return;

    form.reset();
    idInput.value = memberId || '';

    if (mode === 'edit' && memberId) {
      titleEl.textContent = 'Editar Integrante';
      const member = masterState.members.find(m => m.id === memberId);
      if (member) {
        nameInput.value = member.name;
        photoInput.value = member.photo;
        driverInput.checked = Boolean(member.isDriver);
      }
    } else {
      titleEl.textContent = 'Agregar Nuevo Integrante';
    }

    modal.classList.remove('hidden');
    nameInput.focus();
  }

  function closeMemberModal() {
    const modal = document.getElementById('member-modal');
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================================================
  // 11. MODAL DE CONFIRMACIÓN
  // ==========================================================================

  let pendingConfirmCallback = null;

  function confirmAction(title, message, callback) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-modal-title');
    const messageEl = document.getElementById('confirm-modal-message');

    if (!modal) return;

    titleEl.textContent = title;
    messageEl.textContent = message;
    pendingConfirmCallback = callback;

    modal.classList.remove('hidden');
  }

  function closeConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.classList.add('hidden');
    pendingConfirmCallback = null;
  }

  // ==========================================================================
  // 12. ENRUTADOR DINÁMICO & NAVEGACIÓN
  // ==========================================================================

  function handleRoute() {
    // Detectar ruta hash (#/ o #/lisandro o pathname /lisandro)
    let hash = window.location.hash || '';

    // Soporte para acceso directo por pathname si se sirviera bajo servidor
    if (!hash || hash === '#' || hash === '#/') {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (pathname && masterState.members.some(m => m.id === pathname)) {
        hash = `#/${pathname}`;
        window.location.hash = hash;
      }
    }

    const homeView = document.getElementById('home-view');
    const memberView = document.getElementById('member-view');

    if (!hash || hash === '#' || hash === '#/') {
      // Vista Principal (Menú exclusivo de acceso)
      currentMemberId = null;
      homeView.classList.remove('hidden');
      memberView.classList.add('hidden');
      renderHomeView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Vista Individual de un Integrante
      const memberId = hash.replace(/^#\/?/, '').trim();
      const member = masterState.members.find(m => m.id === memberId);

      if (member) {
        homeView.classList.add('hidden');
        memberView.classList.remove('hidden');
        renderMemberView(member.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Si no existe el integrante, volver al inicio
        window.location.hash = '#/';
      }
    }
  }

  // ==========================================================================
  // 13. CONFIGURACIÓN DE EVENT LISTENERS GLOBALES
  // ==========================================================================

  function setupEventListeners() {
    // Escuchar cambios de ruta en la URL
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);

    // Botón volver a inicio
    const btnBackHome = document.getElementById('btn-back-home');
    if (btnBackHome) {
      btnBackHome.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/';
      });
    }

    // Botón logo del header
    const brandLink = document.getElementById('header-brand-link');
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/';
      });
    }

    // Botón reiniciar checklist del integrante
    const btnResetMember = document.getElementById('btn-reset-member');
    if (btnResetMember) {
      btnResetMember.addEventListener('click', resetCurrentMemberChecklist);
    }

    // Filtros de pestañas (Todos, Pendientes, Completados)
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter') || 'all';
        updateChecklistDisplay();
      });
    });

    // Búsqueda en tiempo real
    const searchInput = document.getElementById('checklist-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', !currentSearchQuery);
        }
        updateChecklistDisplay();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        currentSearchQuery = '';
        clearSearchBtn.classList.add('hidden');
        updateChecklistDisplay();
        if (searchInput) searchInput.focus();
      });
    }

    // Botones de acción en Toolbar
    const btnAddItem = document.getElementById('btn-add-item');
    if (btnAddItem) {
      btnAddItem.addEventListener('click', () => {
        openItemModal('add', null, null, 'member');
      });
    }

    const btnAddCategory = document.getElementById('btn-add-category');
    if (btnAddCategory) {
      btnAddCategory.addEventListener('click', () => {
        openCategoryModal('add', null, 'member');
      });
    }

    // Modal de Elemento: Cambio de modo de visibilidad (All vs Selective)
    document.querySelectorAll('input[name="item-visibility-mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const selectiveBox = document.getElementById('item-selective-members-box');
        if (selectiveBox) {
          selectiveBox.classList.toggle('hidden', e.target.value !== 'selective');
        }
      });
    });

    // Formulario de Elemento (Submit)
    const itemForm = document.getElementById('item-form');
    if (itemForm) {
      itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('item-form-id').value;
        const context = document.getElementById('item-form-context').value;
        const name = document.getElementById('item-form-name').value.trim();
        const categoryId = document.getElementById('item-form-category').value;

        if (!name || !categoryId) return;

        let exclusiveTo = [];
        if (context === 'admin') {
          const mode = itemForm.querySelector('input[name="item-visibility-mode"]:checked')?.value;
          if (mode === 'selective') {
            const checkedBoxes = itemForm.querySelectorAll('input[name="exclusive-member"]:checked');
            exclusiveTo = Array.from(checkedBoxes).map(cb => cb.value);
          }
        }

        if (context === 'admin') {
          // Guardar en masterState
          if (id) {
            // Edición
            const item = masterState.items.find(i => i.id === id);
            if (item) {
              item.name = name;
              item.categoryId = categoryId;
              item.exclusiveTo = exclusiveTo;
            }
          } else {
            // Creación
            const newItem = {
              id: 'master-item-' + Date.now(),
              categoryId,
              name,
              exclusiveTo
            };
            masterState.items.push(newItem);
          }
          saveMasterState(masterState);
          renderAdminItems();
          showToast('Elemento maestro guardado.', 'success');
        } else {
          // Guardar en checklist del integrante actual
          if (id) {
            // Edición
            const item = currentMemberChecklist.items.find(i => i.id === id);
            if (item) {
              item.name = name;
              item.categoryId = categoryId;
            }
          } else {
            // Creación
            const newItem = {
              id: 'member-item-' + Date.now(),
              categoryId,
              name,
              completed: false,
              isCustom: true,
              exclusiveTo: []
            };
            currentMemberChecklist.items.push(newItem);
          }
          saveMemberChecklist(currentMemberId, currentMemberChecklist);
          updateChecklistDisplay();
          showToast('Elemento guardado en tu lista.', 'success');
        }

        closeItemModal();
      });
    }

    // Formulario de Categoría (Submit)
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
      categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('category-form-id').value;
        const context = document.getElementById('category-form-context').value;
        const name = document.getElementById('category-form-name').value.trim();

        if (!name) return;

        if (context === 'admin') {
          if (id) {
            const cat = masterState.categories.find(c => c.id === id);
            if (cat) cat.name = name;
          } else {
            const newCat = {
              id: 'master-cat-' + Date.now(),
              name
            };
            masterState.categories.push(newCat);
          }
          saveMasterState(masterState);
          renderAdminCategories();
          populateAdminCategoryFilter();
          showToast('Categoría maestra guardada.', 'success');
        } else {
          if (id) {
            const cat = currentMemberChecklist.categories.find(c => c.id === id);
            if (cat) cat.name = name;
          } else {
            const newCat = {
              id: 'member-cat-' + Date.now(),
              name
            };
            currentMemberChecklist.categories.push(newCat);
          }
          saveMemberChecklist(currentMemberId, currentMemberChecklist);
          updateChecklistDisplay();
          showToast('Categoría guardada.', 'success');
        }

        closeCategoryModal();
      });
    }

    // Formulario de Integrante (Submit en Admin)
    const memberForm = document.getElementById('member-form');
    if (memberForm) {
      memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('member-form-id').value;
        const name = document.getElementById('member-form-name').value.trim();
        const photo = document.getElementById('member-form-photo').value.trim();
        const isDriver = document.getElementById('member-form-is-driver').checked;

        if (!name) return;

        if (id) {
          // Editar integrante existente
          const m = masterState.members.find(x => x.id === id);
          if (m) {
            m.name = name;
            if (photo) m.photo = photo;
            m.isDriver = isDriver;
          }
        } else {
          // Crear nuevo integrante
          const newSlug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('m-' + Date.now());
          const newMember = {
            id: newSlug,
            name,
            photo: photo || `pokemon viaje/${newSlug}.jpg`,
            isDriver
          };
          masterState.members.push(newMember);
        }

        saveMasterState(masterState);
        renderAdminMembers();
        renderHomeView();
        closeMemberModal();
        showToast('Integrante guardado exitosamente.', 'success');
      });
    }

    // Modal de Confirmación
    const btnConfirmAccept = document.getElementById('btn-confirm-accept');
    if (btnConfirmAccept) {
      btnConfirmAccept.addEventListener('click', () => {
        if (typeof pendingConfirmCallback === 'function') {
          pendingConfirmCallback();
        }
        closeConfirmModal();
      });
    }

    const btnConfirmCancel = document.getElementById('btn-confirm-cancel');
    if (btnConfirmCancel) btnConfirmCancel.addEventListener('click', closeConfirmModal);

    const btnCloseConfirm = document.getElementById('btn-close-confirm-modal');
    if (btnCloseConfirm) btnCloseConfirm.addEventListener('click', closeConfirmModal);

    // Formulario de autenticación de Administrador
    const adminAuthForm = document.getElementById('admin-auth-form');
    if (adminAuthForm) {
      adminAuthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('admin-password-input');
        const errorEl = document.getElementById('admin-auth-error');
        const entered = input ? input.value.trim() : '';

        if (entered.toLowerCase() === ADMIN_PASSWORD.toLowerCase()) {
          closeAdminAuthModal();
          openAdminModal();
          showToast('Acceso concedido al Panel de Administración.', 'success');
        } else {
          if (errorEl) errorEl.classList.remove('hidden');
          if (input) {
            input.value = '';
            input.focus();
            input.style.borderColor = 'var(--danger)';
            setTimeout(() => { input.style.borderColor = ''; }, 1500);
          }
        }
      });
    }

    const btnCloseAuth = document.getElementById('btn-close-admin-auth');
    if (btnCloseAuth) btnCloseAuth.addEventListener('click', closeAdminAuthModal);

    const btnCancelAuth = document.getElementById('btn-cancel-admin-auth');
    if (btnCancelAuth) btnCancelAuth.addEventListener('click', closeAdminAuthModal);

    // Cerrar modales con botones de cerrar o backdrop
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        closeAdminAuthModal();
        closeAdminModal();
        closeItemModal();
        closeCategoryModal();
        closeMemberModal();
        closeConfirmModal();
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeAdminAuthModal();
          closeAdminModal();
          closeItemModal();
          closeCategoryModal();
          closeMemberModal();
          closeConfirmModal();
        }
      });
    });

    // Botones de cancelar en modales
    document.getElementById('btn-cancel-item-modal')?.addEventListener('click', closeItemModal);
    document.getElementById('btn-cancel-category-modal')?.addEventListener('click', closeCategoryModal);
    document.getElementById('btn-cancel-member-modal')?.addEventListener('click', closeMemberModal);
    document.getElementById('btn-admin-done')?.addEventListener('click', closeAdminModal);

    // Botón abrir Panel de Administración (solicita contraseña 'tala')
    document.getElementById('btn-open-admin')?.addEventListener('click', promptAdminAuth);
    document.getElementById('btn-close-admin')?.addEventListener('click', closeAdminModal);

    // Pestañas del Panel de Administración
    document.querySelectorAll('.admin-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const content = document.getElementById(targetId);
        if (content) content.classList.add('active');
      });
    });

    // Botones en pestañas de Admin
    document.getElementById('btn-admin-add-member')?.addEventListener('click', () => {
      openMemberModal('add');
    });

    document.getElementById('btn-admin-add-category')?.addEventListener('click', () => {
      openCategoryModal('add', null, 'admin');
    });

    document.getElementById('btn-admin-add-item')?.addEventListener('click', () => {
      openItemModal('add', null, null, 'admin');
    });

    // Filtro de categorías en Admin
    document.getElementById('admin-item-cat-filter')?.addEventListener('change', renderAdminItems);

    // Botón de restablecer todo a fábrica en Admin
    document.getElementById('btn-reset-master-data')?.addEventListener('click', () => {
      confirmAction(
        'Restablecer todo a valores de fábrica',
        '¿Deseás reiniciar los datos maestros a los originales de "lista items" y "pokemon viaje"? Esto restablecerá los integrantes, categorías y elementos predeterminados.',
        () => {
          localStorage.removeItem(MASTER_STORAGE_KEY);
          masterState = loadMasterState();
          renderAdminMembers();
          renderAdminCategories();
          renderAdminItems();
          populateAdminCategoryFilter();
          renderHomeView();
          showToast('Datos maestros restablecidos a valores de fábrica.', 'success');
        }
      );
    });

    // Tecla Escape cierra modales
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAdminAuthModal();
        closeAdminModal();
        closeItemModal();
        closeCategoryModal();
        closeMemberModal();
        closeConfirmModal();
      }
    });
  }

  // ==========================================================================
  // 14. INICIALIZACIÓN DE LA APLICACIÓN
  // ==========================================================================

  function initApp() {
    setupEventListeners();
    handleRoute();
  }

  // Ejecutar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
