package io.github.jhipster.sample.web.rest;

import io.github.jhipster.sample.JhipsterApp;
import io.github.jhipster.sample.domain.BankAccount;
import io.github.jhipster.sample.domain.User;
import io.github.jhipster.sample.domain.Operation;
import io.github.jhipster.sample.repository.BankAccountRepository;
import io.github.jhipster.sample.service.BankAccountService;
import io.github.jhipster.sample.service.dto.BankAccountDTO;
import io.github.jhipster.sample.service.mapper.BankAccountMapper;
import io.github.jhipster.sample.web.rest.errors.ExceptionTranslator;
import io.github.jhipster.sample.service.dto.BankAccountCriteria;
import io.github.jhipster.sample.service.BankAccountQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.jhipster.sample.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.sample.domain.enumeration.BankAccountType;
/**
 * Integration tests for the {@Link BankAccountResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)
public class BankAccountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BANK_NUMBER = 1;
    private static final Integer UPDATED_BANK_NUMBER = 2;

    private static final Long DEFAULT_AGENCY_NUMBER = 1L;
    private static final Long UPDATED_AGENCY_NUMBER = 2L;

    private static final Float DEFAULT_LAST_OPERATION_DURATION = 1F;
    private static final Float UPDATED_LAST_OPERATION_DURATION = 2F;

    private static final Double DEFAULT_MEAN_OPERATION_DURATION = 1D;
    private static final Double UPDATED_MEAN_OPERATION_DURATION = 2D;

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private static final LocalDate DEFAULT_OPENING_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_OPENING_DAY = LocalDate.now(ZoneId.systemDefault());

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

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private BankAccountMapper bankAccountMapper;

    @Autowired
    private BankAccountService bankAccountService;

    @Autowired
    private BankAccountQueryService bankAccountQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBankAccountMockMvc;

    private BankAccount bankAccount;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BankAccountResource bankAccountResource = new BankAccountResource(bankAccountService, bankAccountQueryService);
        this.restBankAccountMockMvc = MockMvcBuilders.standaloneSetup(bankAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createEntity(EntityManager em) {
        BankAccount bankAccount = new BankAccount()
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
        return bankAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BankAccount createUpdatedEntity(EntityManager em) {
        BankAccount bankAccount = new BankAccount()
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
        return bankAccount;
    }

    @BeforeEach
    public void initTest() {
        bankAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createBankAccount() throws Exception {
        int databaseSizeBeforeCreate = bankAccountRepository.findAll().size();

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);
        restBankAccountMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isCreated());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeCreate + 1);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBankAccount.getBankNumber()).isEqualTo(DEFAULT_BANK_NUMBER);
        assertThat(testBankAccount.getAgencyNumber()).isEqualTo(DEFAULT_AGENCY_NUMBER);
        assertThat(testBankAccount.getLastOperationDuration()).isEqualTo(DEFAULT_LAST_OPERATION_DURATION);
        assertThat(testBankAccount.getMeanOperationDuration()).isEqualTo(DEFAULT_MEAN_OPERATION_DURATION);
        assertThat(testBankAccount.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testBankAccount.getOpeningDay()).isEqualTo(DEFAULT_OPENING_DAY);
        assertThat(testBankAccount.getLastOperationDate()).isEqualTo(DEFAULT_LAST_OPERATION_DATE);
        assertThat(testBankAccount.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testBankAccount.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
        assertThat(testBankAccount.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testBankAccount.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testBankAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createBankAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bankAccountRepository.findAll().size();

        // Create the BankAccount with an existing ID
        bankAccount.setId(1L);
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBankAccountMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountRepository.findAll().size();
        // set the field null
        bankAccount.setName(null);

        // Create the BankAccount, which fails.
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        restBankAccountMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBalanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = bankAccountRepository.findAll().size();
        // set the field null
        bankAccount.setBalance(null);

        // Create the BankAccount, which fails.
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        restBankAccountMockMvc.perform(post("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBankAccounts() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList
        restBankAccountMockMvc.perform(get("/api/bank-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].bankNumber").value(hasItem(DEFAULT_BANK_NUMBER)))
            .andExpect(jsonPath("$.[*].agencyNumber").value(hasItem(DEFAULT_AGENCY_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].lastOperationDuration").value(hasItem(DEFAULT_LAST_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].meanOperationDuration").value(hasItem(DEFAULT_MEAN_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].openingDay").value(hasItem(DEFAULT_OPENING_DAY.toString())))
            .andExpect(jsonPath("$.[*].lastOperationDate").value(hasItem(DEFAULT_LAST_OPERATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get the bankAccount
        restBankAccountMockMvc.perform(get("/api/bank-accounts/{id}", bankAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bankAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.bankNumber").value(DEFAULT_BANK_NUMBER))
            .andExpect(jsonPath("$.agencyNumber").value(DEFAULT_AGENCY_NUMBER.intValue()))
            .andExpect(jsonPath("$.lastOperationDuration").value(DEFAULT_LAST_OPERATION_DURATION.doubleValue()))
            .andExpect(jsonPath("$.meanOperationDuration").value(DEFAULT_MEAN_OPERATION_DURATION.doubleValue()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.intValue()))
            .andExpect(jsonPath("$.openingDay").value(DEFAULT_OPENING_DAY.toString()))
            .andExpect(jsonPath("$.lastOperationDate").value(DEFAULT_LAST_OPERATION_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getAllBankAccountsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name equals to DEFAULT_NAME
        defaultBankAccountShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the bankAccountList where name equals to UPDATED_NAME
        defaultBankAccountShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name in DEFAULT_NAME or UPDATED_NAME
        defaultBankAccountShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the bankAccountList where name equals to UPDATED_NAME
        defaultBankAccountShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where name is not null
        defaultBankAccountShouldBeFound("name.specified=true");

        // Get all the bankAccountList where name is null
        defaultBankAccountShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBankNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber equals to DEFAULT_BANK_NUMBER
        defaultBankAccountShouldBeFound("bankNumber.equals=" + DEFAULT_BANK_NUMBER);

        // Get all the bankAccountList where bankNumber equals to UPDATED_BANK_NUMBER
        defaultBankAccountShouldNotBeFound("bankNumber.equals=" + UPDATED_BANK_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBankNumberIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber in DEFAULT_BANK_NUMBER or UPDATED_BANK_NUMBER
        defaultBankAccountShouldBeFound("bankNumber.in=" + DEFAULT_BANK_NUMBER + "," + UPDATED_BANK_NUMBER);

        // Get all the bankAccountList where bankNumber equals to UPDATED_BANK_NUMBER
        defaultBankAccountShouldNotBeFound("bankNumber.in=" + UPDATED_BANK_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBankNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber is not null
        defaultBankAccountShouldBeFound("bankNumber.specified=true");

        // Get all the bankAccountList where bankNumber is null
        defaultBankAccountShouldNotBeFound("bankNumber.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBankNumberIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber greater than or equals to DEFAULT_BANK_NUMBER
        defaultBankAccountShouldBeFound("bankNumber.greaterOrEqualThan=" + DEFAULT_BANK_NUMBER);

        // Get all the bankAccountList where bankNumber greater than or equals to UPDATED_BANK_NUMBER
        defaultBankAccountShouldNotBeFound("bankNumber.greaterOrEqualThan=" + UPDATED_BANK_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBankNumberIsLessThanSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where bankNumber less than or equals to DEFAULT_BANK_NUMBER
        defaultBankAccountShouldNotBeFound("bankNumber.lessThan=" + DEFAULT_BANK_NUMBER);

        // Get all the bankAccountList where bankNumber less than or equals to UPDATED_BANK_NUMBER
        defaultBankAccountShouldBeFound("bankNumber.lessThan=" + UPDATED_BANK_NUMBER);
    }


    @Test
    @Transactional
    public void getAllBankAccountsByAgencyNumberIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber equals to DEFAULT_AGENCY_NUMBER
        defaultBankAccountShouldBeFound("agencyNumber.equals=" + DEFAULT_AGENCY_NUMBER);

        // Get all the bankAccountList where agencyNumber equals to UPDATED_AGENCY_NUMBER
        defaultBankAccountShouldNotBeFound("agencyNumber.equals=" + UPDATED_AGENCY_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAgencyNumberIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber in DEFAULT_AGENCY_NUMBER or UPDATED_AGENCY_NUMBER
        defaultBankAccountShouldBeFound("agencyNumber.in=" + DEFAULT_AGENCY_NUMBER + "," + UPDATED_AGENCY_NUMBER);

        // Get all the bankAccountList where agencyNumber equals to UPDATED_AGENCY_NUMBER
        defaultBankAccountShouldNotBeFound("agencyNumber.in=" + UPDATED_AGENCY_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAgencyNumberIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber is not null
        defaultBankAccountShouldBeFound("agencyNumber.specified=true");

        // Get all the bankAccountList where agencyNumber is null
        defaultBankAccountShouldNotBeFound("agencyNumber.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAgencyNumberIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber greater than or equals to DEFAULT_AGENCY_NUMBER
        defaultBankAccountShouldBeFound("agencyNumber.greaterOrEqualThan=" + DEFAULT_AGENCY_NUMBER);

        // Get all the bankAccountList where agencyNumber greater than or equals to UPDATED_AGENCY_NUMBER
        defaultBankAccountShouldNotBeFound("agencyNumber.greaterOrEqualThan=" + UPDATED_AGENCY_NUMBER);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAgencyNumberIsLessThanSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where agencyNumber less than or equals to DEFAULT_AGENCY_NUMBER
        defaultBankAccountShouldNotBeFound("agencyNumber.lessThan=" + DEFAULT_AGENCY_NUMBER);

        // Get all the bankAccountList where agencyNumber less than or equals to UPDATED_AGENCY_NUMBER
        defaultBankAccountShouldBeFound("agencyNumber.lessThan=" + UPDATED_AGENCY_NUMBER);
    }


    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDurationIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration equals to DEFAULT_LAST_OPERATION_DURATION
        defaultBankAccountShouldBeFound("lastOperationDuration.equals=" + DEFAULT_LAST_OPERATION_DURATION);

        // Get all the bankAccountList where lastOperationDuration equals to UPDATED_LAST_OPERATION_DURATION
        defaultBankAccountShouldNotBeFound("lastOperationDuration.equals=" + UPDATED_LAST_OPERATION_DURATION);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDurationIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration in DEFAULT_LAST_OPERATION_DURATION or UPDATED_LAST_OPERATION_DURATION
        defaultBankAccountShouldBeFound("lastOperationDuration.in=" + DEFAULT_LAST_OPERATION_DURATION + "," + UPDATED_LAST_OPERATION_DURATION);

        // Get all the bankAccountList where lastOperationDuration equals to UPDATED_LAST_OPERATION_DURATION
        defaultBankAccountShouldNotBeFound("lastOperationDuration.in=" + UPDATED_LAST_OPERATION_DURATION);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDurationIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDuration is not null
        defaultBankAccountShouldBeFound("lastOperationDuration.specified=true");

        // Get all the bankAccountList where lastOperationDuration is null
        defaultBankAccountShouldNotBeFound("lastOperationDuration.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByMeanOperationDurationIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration equals to DEFAULT_MEAN_OPERATION_DURATION
        defaultBankAccountShouldBeFound("meanOperationDuration.equals=" + DEFAULT_MEAN_OPERATION_DURATION);

        // Get all the bankAccountList where meanOperationDuration equals to UPDATED_MEAN_OPERATION_DURATION
        defaultBankAccountShouldNotBeFound("meanOperationDuration.equals=" + UPDATED_MEAN_OPERATION_DURATION);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByMeanOperationDurationIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration in DEFAULT_MEAN_OPERATION_DURATION or UPDATED_MEAN_OPERATION_DURATION
        defaultBankAccountShouldBeFound("meanOperationDuration.in=" + DEFAULT_MEAN_OPERATION_DURATION + "," + UPDATED_MEAN_OPERATION_DURATION);

        // Get all the bankAccountList where meanOperationDuration equals to UPDATED_MEAN_OPERATION_DURATION
        defaultBankAccountShouldNotBeFound("meanOperationDuration.in=" + UPDATED_MEAN_OPERATION_DURATION);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByMeanOperationDurationIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where meanOperationDuration is not null
        defaultBankAccountShouldBeFound("meanOperationDuration.specified=true");

        // Get all the bankAccountList where meanOperationDuration is null
        defaultBankAccountShouldNotBeFound("meanOperationDuration.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBalanceIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance equals to DEFAULT_BALANCE
        defaultBankAccountShouldBeFound("balance.equals=" + DEFAULT_BALANCE);

        // Get all the bankAccountList where balance equals to UPDATED_BALANCE
        defaultBankAccountShouldNotBeFound("balance.equals=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBalanceIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance in DEFAULT_BALANCE or UPDATED_BALANCE
        defaultBankAccountShouldBeFound("balance.in=" + DEFAULT_BALANCE + "," + UPDATED_BALANCE);

        // Get all the bankAccountList where balance equals to UPDATED_BALANCE
        defaultBankAccountShouldNotBeFound("balance.in=" + UPDATED_BALANCE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByBalanceIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where balance is not null
        defaultBankAccountShouldBeFound("balance.specified=true");

        // Get all the bankAccountList where balance is null
        defaultBankAccountShouldNotBeFound("balance.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByOpeningDayIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay equals to DEFAULT_OPENING_DAY
        defaultBankAccountShouldBeFound("openingDay.equals=" + DEFAULT_OPENING_DAY);

        // Get all the bankAccountList where openingDay equals to UPDATED_OPENING_DAY
        defaultBankAccountShouldNotBeFound("openingDay.equals=" + UPDATED_OPENING_DAY);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByOpeningDayIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay in DEFAULT_OPENING_DAY or UPDATED_OPENING_DAY
        defaultBankAccountShouldBeFound("openingDay.in=" + DEFAULT_OPENING_DAY + "," + UPDATED_OPENING_DAY);

        // Get all the bankAccountList where openingDay equals to UPDATED_OPENING_DAY
        defaultBankAccountShouldNotBeFound("openingDay.in=" + UPDATED_OPENING_DAY);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByOpeningDayIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay is not null
        defaultBankAccountShouldBeFound("openingDay.specified=true");

        // Get all the bankAccountList where openingDay is null
        defaultBankAccountShouldNotBeFound("openingDay.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByOpeningDayIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay greater than or equals to DEFAULT_OPENING_DAY
        defaultBankAccountShouldBeFound("openingDay.greaterOrEqualThan=" + DEFAULT_OPENING_DAY);

        // Get all the bankAccountList where openingDay greater than or equals to UPDATED_OPENING_DAY
        defaultBankAccountShouldNotBeFound("openingDay.greaterOrEqualThan=" + UPDATED_OPENING_DAY);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByOpeningDayIsLessThanSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where openingDay less than or equals to DEFAULT_OPENING_DAY
        defaultBankAccountShouldNotBeFound("openingDay.lessThan=" + DEFAULT_OPENING_DAY);

        // Get all the bankAccountList where openingDay less than or equals to UPDATED_OPENING_DAY
        defaultBankAccountShouldBeFound("openingDay.lessThan=" + UPDATED_OPENING_DAY);
    }


    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDateIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate equals to DEFAULT_LAST_OPERATION_DATE
        defaultBankAccountShouldBeFound("lastOperationDate.equals=" + DEFAULT_LAST_OPERATION_DATE);

        // Get all the bankAccountList where lastOperationDate equals to UPDATED_LAST_OPERATION_DATE
        defaultBankAccountShouldNotBeFound("lastOperationDate.equals=" + UPDATED_LAST_OPERATION_DATE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDateIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate in DEFAULT_LAST_OPERATION_DATE or UPDATED_LAST_OPERATION_DATE
        defaultBankAccountShouldBeFound("lastOperationDate.in=" + DEFAULT_LAST_OPERATION_DATE + "," + UPDATED_LAST_OPERATION_DATE);

        // Get all the bankAccountList where lastOperationDate equals to UPDATED_LAST_OPERATION_DATE
        defaultBankAccountShouldNotBeFound("lastOperationDate.in=" + UPDATED_LAST_OPERATION_DATE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByLastOperationDateIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where lastOperationDate is not null
        defaultBankAccountShouldBeFound("lastOperationDate.specified=true");

        // Get all the bankAccountList where lastOperationDate is null
        defaultBankAccountShouldNotBeFound("lastOperationDate.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByActiveIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active equals to DEFAULT_ACTIVE
        defaultBankAccountShouldBeFound("active.equals=" + DEFAULT_ACTIVE);

        // Get all the bankAccountList where active equals to UPDATED_ACTIVE
        defaultBankAccountShouldNotBeFound("active.equals=" + UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByActiveIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active in DEFAULT_ACTIVE or UPDATED_ACTIVE
        defaultBankAccountShouldBeFound("active.in=" + DEFAULT_ACTIVE + "," + UPDATED_ACTIVE);

        // Get all the bankAccountList where active equals to UPDATED_ACTIVE
        defaultBankAccountShouldNotBeFound("active.in=" + UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByActiveIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where active is not null
        defaultBankAccountShouldBeFound("active.specified=true");

        // Get all the bankAccountList where active is null
        defaultBankAccountShouldNotBeFound("active.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAccountTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType equals to DEFAULT_ACCOUNT_TYPE
        defaultBankAccountShouldBeFound("accountType.equals=" + DEFAULT_ACCOUNT_TYPE);

        // Get all the bankAccountList where accountType equals to UPDATED_ACCOUNT_TYPE
        defaultBankAccountShouldNotBeFound("accountType.equals=" + UPDATED_ACCOUNT_TYPE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAccountTypeIsInShouldWork() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType in DEFAULT_ACCOUNT_TYPE or UPDATED_ACCOUNT_TYPE
        defaultBankAccountShouldBeFound("accountType.in=" + DEFAULT_ACCOUNT_TYPE + "," + UPDATED_ACCOUNT_TYPE);

        // Get all the bankAccountList where accountType equals to UPDATED_ACCOUNT_TYPE
        defaultBankAccountShouldNotBeFound("accountType.in=" + UPDATED_ACCOUNT_TYPE);
    }

    @Test
    @Transactional
    public void getAllBankAccountsByAccountTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        // Get all the bankAccountList where accountType is not null
        defaultBankAccountShouldBeFound("accountType.specified=true");

        // Get all the bankAccountList where accountType is null
        defaultBankAccountShouldNotBeFound("accountType.specified=false");
    }

    @Test
    @Transactional
    public void getAllBankAccountsByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        bankAccount.setUser(user);
        bankAccountRepository.saveAndFlush(bankAccount);
        Long userId = user.getId();

        // Get all the bankAccountList where user equals to userId
        defaultBankAccountShouldBeFound("userId.equals=" + userId);

        // Get all the bankAccountList where user equals to userId + 1
        defaultBankAccountShouldNotBeFound("userId.equals=" + (userId + 1));
    }


    @Test
    @Transactional
    public void getAllBankAccountsByOperationIsEqualToSomething() throws Exception {
        // Initialize the database
        Operation operation = OperationResourceIT.createEntity(em);
        em.persist(operation);
        em.flush();
        bankAccount.addOperation(operation);
        bankAccountRepository.saveAndFlush(bankAccount);
        Long operationId = operation.getId();

        // Get all the bankAccountList where operation equals to operationId
        defaultBankAccountShouldBeFound("operationId.equals=" + operationId);

        // Get all the bankAccountList where operation equals to operationId + 1
        defaultBankAccountShouldNotBeFound("operationId.equals=" + (operationId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultBankAccountShouldBeFound(String filter) throws Exception {
        restBankAccountMockMvc.perform(get("/api/bank-accounts?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bankAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bankNumber").value(hasItem(DEFAULT_BANK_NUMBER)))
            .andExpect(jsonPath("$.[*].agencyNumber").value(hasItem(DEFAULT_AGENCY_NUMBER.intValue())))
            .andExpect(jsonPath("$.[*].lastOperationDuration").value(hasItem(DEFAULT_LAST_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].meanOperationDuration").value(hasItem(DEFAULT_MEAN_OPERATION_DURATION.doubleValue())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].openingDay").value(hasItem(DEFAULT_OPENING_DAY.toString())))
            .andExpect(jsonPath("$.[*].lastOperationDate").value(hasItem(DEFAULT_LAST_OPERATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));

        // Check, that the count call also returns 1
        restBankAccountMockMvc.perform(get("/api/bank-accounts/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultBankAccountShouldNotBeFound(String filter) throws Exception {
        restBankAccountMockMvc.perform(get("/api/bank-accounts?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restBankAccountMockMvc.perform(get("/api/bank-accounts/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingBankAccount() throws Exception {
        // Get the bankAccount
        restBankAccountMockMvc.perform(get("/api/bank-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();

        // Update the bankAccount
        BankAccount updatedBankAccount = bankAccountRepository.findById(bankAccount.getId()).get();
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

        restBankAccountMockMvc.perform(put("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isOk());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
        BankAccount testBankAccount = bankAccountList.get(bankAccountList.size() - 1);
        assertThat(testBankAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBankAccount.getBankNumber()).isEqualTo(UPDATED_BANK_NUMBER);
        assertThat(testBankAccount.getAgencyNumber()).isEqualTo(UPDATED_AGENCY_NUMBER);
        assertThat(testBankAccount.getLastOperationDuration()).isEqualTo(UPDATED_LAST_OPERATION_DURATION);
        assertThat(testBankAccount.getMeanOperationDuration()).isEqualTo(UPDATED_MEAN_OPERATION_DURATION);
        assertThat(testBankAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testBankAccount.getOpeningDay()).isEqualTo(UPDATED_OPENING_DAY);
        assertThat(testBankAccount.getLastOperationDate()).isEqualTo(UPDATED_LAST_OPERATION_DATE);
        assertThat(testBankAccount.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testBankAccount.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
        assertThat(testBankAccount.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testBankAccount.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testBankAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingBankAccount() throws Exception {
        int databaseSizeBeforeUpdate = bankAccountRepository.findAll().size();

        // Create the BankAccount
        BankAccountDTO bankAccountDTO = bankAccountMapper.toDto(bankAccount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBankAccountMockMvc.perform(put("/api/bank-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bankAccountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BankAccount in the database
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBankAccount() throws Exception {
        // Initialize the database
        bankAccountRepository.saveAndFlush(bankAccount);

        int databaseSizeBeforeDelete = bankAccountRepository.findAll().size();

        // Delete the bankAccount
        restBankAccountMockMvc.perform(delete("/api/bank-accounts/{id}", bankAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BankAccount> bankAccountList = bankAccountRepository.findAll();
        assertThat(bankAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccount.class);
        BankAccount bankAccount1 = new BankAccount();
        bankAccount1.setId(1L);
        BankAccount bankAccount2 = new BankAccount();
        bankAccount2.setId(bankAccount1.getId());
        assertThat(bankAccount1).isEqualTo(bankAccount2);
        bankAccount2.setId(2L);
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);
        bankAccount1.setId(null);
        assertThat(bankAccount1).isNotEqualTo(bankAccount2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BankAccountDTO.class);
        BankAccountDTO bankAccountDTO1 = new BankAccountDTO();
        bankAccountDTO1.setId(1L);
        BankAccountDTO bankAccountDTO2 = new BankAccountDTO();
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
        bankAccountDTO2.setId(bankAccountDTO1.getId());
        assertThat(bankAccountDTO1).isEqualTo(bankAccountDTO2);
        bankAccountDTO2.setId(2L);
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
        bankAccountDTO1.setId(null);
        assertThat(bankAccountDTO1).isNotEqualTo(bankAccountDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(bankAccountMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(bankAccountMapper.fromId(null)).isNull();
    }
}
