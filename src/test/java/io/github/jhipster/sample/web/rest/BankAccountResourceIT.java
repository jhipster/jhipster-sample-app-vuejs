package io.github.jhipster.sample.web.rest;

import static io.github.jhipster.sample.domain.BankAccountAsserts.*;
import static io.github.jhipster.sample.web.rest.TestUtil.createUpdateProxyForBean;
import static io.github.jhipster.sample.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jhipster.sample.IntegrationTest;
import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.domain.User;
import io.github.jhipster.sample.domain.enumeration.BankAccountType;
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.repository.UserRepository;
import io.github.jhipster.sample.service.BankAccountService;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.mapper.BankAccountMapper;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BankAccountResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BankAccountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BANK_NUMBER = 1;
    private static final Integer UPDATED_BANK_NUMBER = 2;
    private static final Integer SMALLER_BANK_NUMBER = 1 - 1;

    private static final Long DEFAULT_AGENCY_NUMBER = 1L;
    private static final Long UPDATED_AGENCY_NUMBER = 2L;
    private static final Long SMALLER_AGENCY_NUMBER = 1L - 1L;

    private static final Float DEFAULT_LAST_OPERATION_DURATION = 1F;
    private static final Float UPDATED_LAST_OPERATION_DURATION = 2F;
    private static final Float SMALLER_LAST_OPERATION_DURATION = 1F - 1F;

    private static final Double DEFAULT_MEAN_OPERATION_DURATION = 1D;
    private static final Double UPDATED_MEAN_OPERATION_DURATION = 2D;
    private static final Double SMALLER_MEAN_OPERATION_DURATION = 1D - 1D;

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);
    private static final BigDecimal SMALLER_BALANCE = new BigDecimal(1 - 1);

    private static final LocalDate DEFAULT_OPENING_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_OPENING_DAY = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_OPENING_DAY = LocalDate.ofEpochDay(-1L);

    private static final Instant DEFAULT_LAST_OPERATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_OPERATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final BankAccountType DEFAULT_ACCOUNT_TYPE = BankAccountType.CHECKING;
    private static final BankAccountType UPDATED_ACCOUNT_TYPE = BankAccountType.SAVINGS;

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/bank-accounts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private BankAccountRepository bankAccountRepositoryMock;

    @Autowired
    private BankAccountMapper bankAccountMapper;

    @Mock
    private BankAccountService bankAccountServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBankAccountMockMvc;

    private BankAccount bankAccount;

    private BankAccount insertedBankAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createEntity() {
        return new BankAccount()
            .name(DEFAULT_NAME)
            .bankNumber(DEFAULT_BANK_NUMBER)
            .agencyNumber(DEFAULT_AGENCY_NUMBER)
            .lastOperationDuration(DEFAULT_LAST_OPERATION_DURATION)
            .meanOperationDuration(DEFAULT_MEAN_OPERATION_DURATION)
            .balance(DEFAULT_BALANCE)
            .openingDay(DEFAULT_OPENING_DAY)
            .lastOperationDate(DEFAULT_LAST_OPERATION_DATE)
            .active(DEFAULT_ACTIVE)
            .accountType(DEFAULT_ACCOUNT_TYPE)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .description(DEFAULT_DESCRIPTION);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createUpdatedEntity() {
        return new BankAccount()
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);
    }

    @BeforeEach
    public void initTest() {
        bankAccount = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedBankAccount != null) {
            bankAccountRepository.delete(insertedBankAccount);
            insertedBankAccount = null;
        }
    }

    @Test
    @Transactional
    void createBankAccount() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);
        var returnedBankAccountDTO = om.readValue(
            restBankAccountMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bankAccountDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BankAccountDTO.class
        );

        // Validate the BankAccount in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBankAccount = bankAccountMapper.toEntity(returnedBankAccountDTO);
        assertBankAccountUpdatableFieldsEquals(returnedBankAccount, getPersistedBankAccount(returnedBankAccount));

        insertedBankAccount = returnedBankAccount;
    }

    @Test
    @Transactional
    void createBankAccountWithExistingId() throws Exception {
        // Create the BankAccount with an existing ID
        bankAccount.setId(1L);
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankAccountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bankAccount.setName(null);

        // Create the BankAccount, which fails.
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        restBankAccountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBalanceIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bankAccount.setBalance(null);

        // Create the BankAccount, which fails.
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        restBankAccountMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllBankAccounts() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bankNumber").value(hasItem(DEFAULT_BANK_NUMBER)))
            .andExpect(jsonPath("$.[*].agencyNumber").value(hasItem(DEFAULT_AGENCY_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].lastOperationDuration").value(hasItem(DEFAULT_LAST_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].meanOperationDuration").value(hasItem(DEFAULT_MEAN_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(sameNumber(DEFAULT_BALANCE))))
            .andExpect(jsonPath("$.[*].openingDay").value(hasItem(DEFAULT_OPENING_DAY.toString())))
            .andExpect(jsonPath("$.[*].lastOperationDate").value(hasItem(DEFAULT_LAST_OPERATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBankAccountsWithEagerRelationshipsIsEnabled() throws Exception {
        when(bankAccountServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBankAccountMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(bankAccountServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBankAccountsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(bankAccountServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBankAccountMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(bankAccountRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBankAccount() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get the bankAccount
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL_ID, bankAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bankAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.bankNumber").value(DEFAULT_BANK_NUMBER))
            .andExpect(jsonPath("$.agencyNumber").value(DEFAULT_AGENCY_NUMBER.intValue()))
            .andExpect(jsonPath("$.lastOperationDuration").value(DEFAULT_LAST_OPERATION_DURATION.doubleValue()))
            .andExpect(jsonPath("$.meanOperationDuration").value(DEFAULT_MEAN_OPERATION_DURATION.doubleValue()))
            .andExpect(jsonPath("$.balance").value(sameNumber(DEFAULT_BALANCE)))
            .andExpect(jsonPath("$.openingDay").value(DEFAULT_OPENING_DAY.toString()))
            .andExpect(jsonPath("$.lastOperationDate").value(DEFAULT_LAST_OPERATION_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64.getEncoder().encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    void getBankAccountsByIdFiltering() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        Long id = bankAccount.getId();

        defaultBankAccountFiltering("id.equals=" + id, "id.notEquals=" + id);

        defaultBankAccountFiltering("id.greaterThanOrEqual=" + id, "id.greaterThan=" + id);

        defaultBankAccountFiltering("id.lessThanOrEqual=" + id, "id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllBankAccountsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name equals to
        defaultBankAccountFiltering("name.equals=" + DEFAULT_NAME, "name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllBankAccountsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name in
        defaultBankAccountFiltering("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME, "name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllBankAccountsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name is not null
        defaultBankAccountFiltering("name.specified=true", "name.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByNameContainsSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name contains
        defaultBankAccountFiltering("name.contains=" + DEFAULT_NAME, "name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    void getAllBankAccountsByNameNotContainsSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name does not contain
        defaultBankAccountFiltering("name.doesNotContain=" + UPDATED_NAME, "name.doesNotContain=" + DEFAULT_NAME);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber equals to
        defaultBankAccountFiltering("bankNumber.equals=" + DEFAULT_BANK_NUMBER, "bankNumber.equals=" + UPDATED_BANK_NUMBER);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber in
        defaultBankAccountFiltering(
            "bankNumber.in=" + DEFAULT_BANK_NUMBER + "," + UPDATED_BANK_NUMBER,
            "bankNumber.in=" + UPDATED_BANK_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is not null
        defaultBankAccountFiltering("bankNumber.specified=true", "bankNumber.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is greater than or equal to
        defaultBankAccountFiltering(
            "bankNumber.greaterThanOrEqual=" + DEFAULT_BANK_NUMBER,
            "bankNumber.greaterThanOrEqual=" + UPDATED_BANK_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is less than or equal to
        defaultBankAccountFiltering(
            "bankNumber.lessThanOrEqual=" + DEFAULT_BANK_NUMBER,
            "bankNumber.lessThanOrEqual=" + SMALLER_BANK_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is less than
        defaultBankAccountFiltering("bankNumber.lessThan=" + UPDATED_BANK_NUMBER, "bankNumber.lessThan=" + DEFAULT_BANK_NUMBER);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBankNumberIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is greater than
        defaultBankAccountFiltering("bankNumber.greaterThan=" + SMALLER_BANK_NUMBER, "bankNumber.greaterThan=" + DEFAULT_BANK_NUMBER);
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber equals to
        defaultBankAccountFiltering("agencyNumber.equals=" + DEFAULT_AGENCY_NUMBER, "agencyNumber.equals=" + UPDATED_AGENCY_NUMBER);
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber in
        defaultBankAccountFiltering(
            "agencyNumber.in=" + DEFAULT_AGENCY_NUMBER + "," + UPDATED_AGENCY_NUMBER,
            "agencyNumber.in=" + UPDATED_AGENCY_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is not null
        defaultBankAccountFiltering("agencyNumber.specified=true", "agencyNumber.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is greater than or equal to
        defaultBankAccountFiltering(
            "agencyNumber.greaterThanOrEqual=" + DEFAULT_AGENCY_NUMBER,
            "agencyNumber.greaterThanOrEqual=" + UPDATED_AGENCY_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is less than or equal to
        defaultBankAccountFiltering(
            "agencyNumber.lessThanOrEqual=" + DEFAULT_AGENCY_NUMBER,
            "agencyNumber.lessThanOrEqual=" + SMALLER_AGENCY_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is less than
        defaultBankAccountFiltering("agencyNumber.lessThan=" + UPDATED_AGENCY_NUMBER, "agencyNumber.lessThan=" + DEFAULT_AGENCY_NUMBER);
    }

    @Test
    @Transactional
    void getAllBankAccountsByAgencyNumberIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is greater than
        defaultBankAccountFiltering(
            "agencyNumber.greaterThan=" + SMALLER_AGENCY_NUMBER,
            "agencyNumber.greaterThan=" + DEFAULT_AGENCY_NUMBER
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration equals to
        defaultBankAccountFiltering(
            "lastOperationDuration.equals=" + DEFAULT_LAST_OPERATION_DURATION,
            "lastOperationDuration.equals=" + UPDATED_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration in
        defaultBankAccountFiltering(
            "lastOperationDuration.in=" + DEFAULT_LAST_OPERATION_DURATION + "," + UPDATED_LAST_OPERATION_DURATION,
            "lastOperationDuration.in=" + UPDATED_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is not null
        defaultBankAccountFiltering("lastOperationDuration.specified=true", "lastOperationDuration.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is greater than or equal to
        defaultBankAccountFiltering(
            "lastOperationDuration.greaterThanOrEqual=" + DEFAULT_LAST_OPERATION_DURATION,
            "lastOperationDuration.greaterThanOrEqual=" + UPDATED_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is less than or equal to
        defaultBankAccountFiltering(
            "lastOperationDuration.lessThanOrEqual=" + DEFAULT_LAST_OPERATION_DURATION,
            "lastOperationDuration.lessThanOrEqual=" + SMALLER_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is less than
        defaultBankAccountFiltering(
            "lastOperationDuration.lessThan=" + UPDATED_LAST_OPERATION_DURATION,
            "lastOperationDuration.lessThan=" + DEFAULT_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDurationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is greater than
        defaultBankAccountFiltering(
            "lastOperationDuration.greaterThan=" + SMALLER_LAST_OPERATION_DURATION,
            "lastOperationDuration.greaterThan=" + DEFAULT_LAST_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration equals to
        defaultBankAccountFiltering(
            "meanOperationDuration.equals=" + DEFAULT_MEAN_OPERATION_DURATION,
            "meanOperationDuration.equals=" + UPDATED_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration in
        defaultBankAccountFiltering(
            "meanOperationDuration.in=" + DEFAULT_MEAN_OPERATION_DURATION + "," + UPDATED_MEAN_OPERATION_DURATION,
            "meanOperationDuration.in=" + UPDATED_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is not null
        defaultBankAccountFiltering("meanOperationDuration.specified=true", "meanOperationDuration.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is greater than or equal to
        defaultBankAccountFiltering(
            "meanOperationDuration.greaterThanOrEqual=" + DEFAULT_MEAN_OPERATION_DURATION,
            "meanOperationDuration.greaterThanOrEqual=" + UPDATED_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is less than or equal to
        defaultBankAccountFiltering(
            "meanOperationDuration.lessThanOrEqual=" + DEFAULT_MEAN_OPERATION_DURATION,
            "meanOperationDuration.lessThanOrEqual=" + SMALLER_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is less than
        defaultBankAccountFiltering(
            "meanOperationDuration.lessThan=" + UPDATED_MEAN_OPERATION_DURATION,
            "meanOperationDuration.lessThan=" + DEFAULT_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByMeanOperationDurationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is greater than
        defaultBankAccountFiltering(
            "meanOperationDuration.greaterThan=" + SMALLER_MEAN_OPERATION_DURATION,
            "meanOperationDuration.greaterThan=" + DEFAULT_MEAN_OPERATION_DURATION
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance equals to
        defaultBankAccountFiltering("balance.equals=" + DEFAULT_BALANCE, "balance.equals=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance in
        defaultBankAccountFiltering("balance.in=" + DEFAULT_BALANCE + "," + UPDATED_BALANCE, "balance.in=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is not null
        defaultBankAccountFiltering("balance.specified=true", "balance.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is greater than or equal to
        defaultBankAccountFiltering("balance.greaterThanOrEqual=" + DEFAULT_BALANCE, "balance.greaterThanOrEqual=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is less than or equal to
        defaultBankAccountFiltering("balance.lessThanOrEqual=" + DEFAULT_BALANCE, "balance.lessThanOrEqual=" + SMALLER_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is less than
        defaultBankAccountFiltering("balance.lessThan=" + UPDATED_BALANCE, "balance.lessThan=" + DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByBalanceIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is greater than
        defaultBankAccountFiltering("balance.greaterThan=" + SMALLER_BALANCE, "balance.greaterThan=" + DEFAULT_BALANCE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay equals to
        defaultBankAccountFiltering("openingDay.equals=" + DEFAULT_OPENING_DAY, "openingDay.equals=" + UPDATED_OPENING_DAY);
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay in
        defaultBankAccountFiltering(
            "openingDay.in=" + DEFAULT_OPENING_DAY + "," + UPDATED_OPENING_DAY,
            "openingDay.in=" + UPDATED_OPENING_DAY
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is not null
        defaultBankAccountFiltering("openingDay.specified=true", "openingDay.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is greater than or equal to
        defaultBankAccountFiltering(
            "openingDay.greaterThanOrEqual=" + DEFAULT_OPENING_DAY,
            "openingDay.greaterThanOrEqual=" + UPDATED_OPENING_DAY
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is less than or equal to
        defaultBankAccountFiltering(
            "openingDay.lessThanOrEqual=" + DEFAULT_OPENING_DAY,
            "openingDay.lessThanOrEqual=" + SMALLER_OPENING_DAY
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsLessThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is less than
        defaultBankAccountFiltering("openingDay.lessThan=" + UPDATED_OPENING_DAY, "openingDay.lessThan=" + DEFAULT_OPENING_DAY);
    }

    @Test
    @Transactional
    void getAllBankAccountsByOpeningDayIsGreaterThanSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is greater than
        defaultBankAccountFiltering("openingDay.greaterThan=" + SMALLER_OPENING_DAY, "openingDay.greaterThan=" + DEFAULT_OPENING_DAY);
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate equals to
        defaultBankAccountFiltering(
            "lastOperationDate.equals=" + DEFAULT_LAST_OPERATION_DATE,
            "lastOperationDate.equals=" + UPDATED_LAST_OPERATION_DATE
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDateIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate in
        defaultBankAccountFiltering(
            "lastOperationDate.in=" + DEFAULT_LAST_OPERATION_DATE + "," + UPDATED_LAST_OPERATION_DATE,
            "lastOperationDate.in=" + UPDATED_LAST_OPERATION_DATE
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByLastOperationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate is not null
        defaultBankAccountFiltering("lastOperationDate.specified=true", "lastOperationDate.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByActiveIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active equals to
        defaultBankAccountFiltering("active.equals=" + DEFAULT_ACTIVE, "active.equals=" + UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByActiveIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active in
        defaultBankAccountFiltering("active.in=" + DEFAULT_ACTIVE + "," + UPDATED_ACTIVE, "active.in=" + UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByActiveIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active is not null
        defaultBankAccountFiltering("active.specified=true", "active.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByAccountTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType equals to
        defaultBankAccountFiltering("accountType.equals=" + DEFAULT_ACCOUNT_TYPE, "accountType.equals=" + UPDATED_ACCOUNT_TYPE);
    }

    @Test
    @Transactional
    void getAllBankAccountsByAccountTypeIsInShouldWork() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType in
        defaultBankAccountFiltering(
            "accountType.in=" + DEFAULT_ACCOUNT_TYPE + "," + UPDATED_ACCOUNT_TYPE,
            "accountType.in=" + UPDATED_ACCOUNT_TYPE
        );
    }

    @Test
    @Transactional
    void getAllBankAccountsByAccountTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType is not null
        defaultBankAccountFiltering("accountType.specified=true", "accountType.specified=false");
    }

    @Test
    @Transactional
    void getAllBankAccountsByUserIsEqualToSomething() throws Exception {
        User user;
        if (TestUtil.findAll(em, User.class).isEmpty()) {
            bankAccountRepository.saveAndFlush(bankAccount);
            user = UserResourceIT.createEntity();
        } else {
            user = TestUtil.findAll(em, User.class).get(0);
        }
        em.persist(user);
        em.flush();
        bankAccount.setUser(user);
        bankAccountRepository.saveAndFlush(bankAccount);
        Long userId = user.getId();
        // Get all the bankAccountList where user equals to userId
        defaultBankAccountShouldBeFound("userId.equals=" + userId);

        // Get all the bankAccountList where user equals to (userId + 1)
        defaultBankAccountShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    private void defaultBankAccountFiltering(String shouldBeFound, String shouldNotBeFound) throws Exception {
        defaultBankAccountShouldBeFound(shouldBeFound);
        defaultBankAccountShouldNotBeFound(shouldNotBeFound);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultBankAccountShouldBeFound(String filter) throws Exception {
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bankNumber").value(hasItem(DEFAULT_BANK_NUMBER)))
            .andExpect(jsonPath("$.[*].agencyNumber").value(hasItem(DEFAULT_AGENCY_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].lastOperationDuration").value(hasItem(DEFAULT_LAST_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].meanOperationDuration").value(hasItem(DEFAULT_MEAN_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(sameNumber(DEFAULT_BALANCE))))
            .andExpect(jsonPath("$.[*].openingDay").value(hasItem(DEFAULT_OPENING_DAY.toString())))
            .andExpect(jsonPath("$.[*].lastOperationDate").value(hasItem(DEFAULT_LAST_OPERATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));

        // Check, that the count call also returns 1
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultBankAccountShouldNotBeFound(String filter) throws Exception {
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restBankAccountMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingBankAccount() throws Exception {
        // Get the bankAccount
        restBankAccountMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBankAccount() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bankAccount
        BankAccount updatedBankAccount = bankAccountRepository.findById(bankAccount.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBankAccount are not directly saved in db
        em.detach(updatedBankAccount);
        updatedBankAccount
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(updatedBankAccount);

        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bankAccountDTO))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBankAccountToMatchAllProperties(updatedBankAccount);
    }

    @Test
    @Transactional
    void putNonExistingBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bankAccountDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBankAccountWithPatch() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bankAccount using partial update
        BankAccount partialUpdatedBankAccount = new BankAccount();
        partialUpdatedBankAccount.setId(bankAccount.getId());

        partialUpdatedBankAccount
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .active(UPDATED_ACTIVE);

        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBankAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBankAccount))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBankAccountUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedBankAccount, bankAccount),
            getPersistedBankAccount(bankAccount)
        );
    }

    @Test
    @Transactional
    void fullUpdateBankAccountWithPatch() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bankAccount using partial update
        BankAccount partialUpdatedBankAccount = new BankAccount();
        partialUpdatedBankAccount.setId(bankAccount.getId());

        partialUpdatedBankAccount
            .name(UPDATED_NAME)
            .bankNumber(UPDATED_BANK_NUMBER)
            .agencyNumber(UPDATED_AGENCY_NUMBER)
            .lastOperationDuration(UPDATED_LAST_OPERATION_DURATION)
            .meanOperationDuration(UPDATED_MEAN_OPERATION_DURATION)
            .balance(UPDATED_BALANCE)
            .openingDay(UPDATED_OPENING_DAY)
            .lastOperationDate(UPDATED_LAST_OPERATION_DATE)
            .active(UPDATED_ACTIVE)
            .accountType(UPDATED_ACCOUNT_TYPE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);

        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBankAccount.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBankAccount))
            )
            .andExpect(status().isOk());

        // Validate the BankAccount in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBankAccountUpdatableFieldsEquals(partialUpdatedBankAccount, getPersistedBankAccount(partialUpdatedBankAccount));
    }

    @Test
    @Transactional
    void patchNonExistingBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bankAccountDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bankAccountDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBankAccount() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bankAccount.setId(longCount.incrementAndGet());

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBankAccountMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bankAccountDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BankAccount in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBankAccount() throws Exception {
        // Initialize the database
        insertedBankAccount = bankAccountRepository.saveAndFlush(bankAccount);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bankAccount
        restBankAccountMockMvc
            .perform(delete(ENTITY_API_URL_ID, bankAccount.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bankAccountRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected BankAccount getPersistedBankAccount(BankAccount bankAccount) {
        return bankAccountRepository.findById(bankAccount.getId()).orElseThrow();
    }

    protected void assertPersistedBankAccountToMatchAllProperties(BankAccount expectedBankAccount) {
        assertBankAccountAllPropertiesEquals(expectedBankAccount, getPersistedBankAccount(expectedBankAccount));
    }

    protected void assertPersistedBankAccountToMatchUpdatableProperties(BankAccount expectedBankAccount) {
        assertBankAccountAllUpdatablePropertiesEquals(expectedBankAccount, getPersistedBankAccount(expectedBankAccount));
    }
}
