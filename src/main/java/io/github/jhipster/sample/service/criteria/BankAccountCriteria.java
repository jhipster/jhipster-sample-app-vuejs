package io.github.jhipster.sample.service.criteria;

import io.github.jhipster.sample.domain.enumeration.BankAccountType;
import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link io.github.jhipster.sample.domain.BankAccount} entity. This class is used
 * in {@link io.github.jhipster.sample.web.rest.BankAccountResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /bank-accounts?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccountCriteria implements Serializable, Criteria {

    /**
     * Class for filtering BankAccountType
     */
    public static class BankAccountTypeFilter extends Filter<BankAccountType> {

        public BankAccountTypeFilter() {}

        public BankAccountTypeFilter(BankAccountTypeFilter filter) {
            super(filter);
        }

        @Override
        public BankAccountTypeFilter copy() {
            return new BankAccountTypeFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter name;

    private IntegerFilter bankNumber;

    private LongFilter agencyNumber;

    private FloatFilter lastOperationDuration;

    private DoubleFilter meanOperationDuration;

    private BigDecimalFilter balance;

    private LocalDateFilter openingDay;

    private InstantFilter lastOperationDate;

    private BooleanFilter active;

    private BankAccountTypeFilter accountType;

    private LongFilter userId;

    private LongFilter operationId;

    private Boolean distinct;

    public BankAccountCriteria() {}

    public BankAccountCriteria(BankAccountCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.name = other.optionalName().map(StringFilter::copy).orElse(null);
        this.bankNumber = other.optionalBankNumber().map(IntegerFilter::copy).orElse(null);
        this.agencyNumber = other.optionalAgencyNumber().map(LongFilter::copy).orElse(null);
        this.lastOperationDuration = other.optionalLastOperationDuration().map(FloatFilter::copy).orElse(null);
        this.meanOperationDuration = other.optionalMeanOperationDuration().map(DoubleFilter::copy).orElse(null);
        this.balance = other.optionalBalance().map(BigDecimalFilter::copy).orElse(null);
        this.openingDay = other.optionalOpeningDay().map(LocalDateFilter::copy).orElse(null);
        this.lastOperationDate = other.optionalLastOperationDate().map(InstantFilter::copy).orElse(null);
        this.active = other.optionalActive().map(BooleanFilter::copy).orElse(null);
        this.accountType = other.optionalAccountType().map(BankAccountTypeFilter::copy).orElse(null);
        this.userId = other.optionalUserId().map(LongFilter::copy).orElse(null);
        this.operationId = other.optionalOperationId().map(LongFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public BankAccountCriteria copy() {
        return new BankAccountCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public Optional<StringFilter> optionalName() {
        return Optional.ofNullable(name);
    }

    public StringFilter name() {
        if (name == null) {
            setName(new StringFilter());
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public IntegerFilter getBankNumber() {
        return bankNumber;
    }

    public Optional<IntegerFilter> optionalBankNumber() {
        return Optional.ofNullable(bankNumber);
    }

    public IntegerFilter bankNumber() {
        if (bankNumber == null) {
            setBankNumber(new IntegerFilter());
        }
        return bankNumber;
    }

    public void setBankNumber(IntegerFilter bankNumber) {
        this.bankNumber = bankNumber;
    }

    public LongFilter getAgencyNumber() {
        return agencyNumber;
    }

    public Optional<LongFilter> optionalAgencyNumber() {
        return Optional.ofNullable(agencyNumber);
    }

    public LongFilter agencyNumber() {
        if (agencyNumber == null) {
            setAgencyNumber(new LongFilter());
        }
        return agencyNumber;
    }

    public void setAgencyNumber(LongFilter agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public FloatFilter getLastOperationDuration() {
        return lastOperationDuration;
    }

    public Optional<FloatFilter> optionalLastOperationDuration() {
        return Optional.ofNullable(lastOperationDuration);
    }

    public FloatFilter lastOperationDuration() {
        if (lastOperationDuration == null) {
            setLastOperationDuration(new FloatFilter());
        }
        return lastOperationDuration;
    }

    public void setLastOperationDuration(FloatFilter lastOperationDuration) {
        this.lastOperationDuration = lastOperationDuration;
    }

    public DoubleFilter getMeanOperationDuration() {
        return meanOperationDuration;
    }

    public Optional<DoubleFilter> optionalMeanOperationDuration() {
        return Optional.ofNullable(meanOperationDuration);
    }

    public DoubleFilter meanOperationDuration() {
        if (meanOperationDuration == null) {
            setMeanOperationDuration(new DoubleFilter());
        }
        return meanOperationDuration;
    }

    public void setMeanOperationDuration(DoubleFilter meanOperationDuration) {
        this.meanOperationDuration = meanOperationDuration;
    }

    public BigDecimalFilter getBalance() {
        return balance;
    }

    public Optional<BigDecimalFilter> optionalBalance() {
        return Optional.ofNullable(balance);
    }

    public BigDecimalFilter balance() {
        if (balance == null) {
            setBalance(new BigDecimalFilter());
        }
        return balance;
    }

    public void setBalance(BigDecimalFilter balance) {
        this.balance = balance;
    }

    public LocalDateFilter getOpeningDay() {
        return openingDay;
    }

    public Optional<LocalDateFilter> optionalOpeningDay() {
        return Optional.ofNullable(openingDay);
    }

    public LocalDateFilter openingDay() {
        if (openingDay == null) {
            setOpeningDay(new LocalDateFilter());
        }
        return openingDay;
    }

    public void setOpeningDay(LocalDateFilter openingDay) {
        this.openingDay = openingDay;
    }

    public InstantFilter getLastOperationDate() {
        return lastOperationDate;
    }

    public Optional<InstantFilter> optionalLastOperationDate() {
        return Optional.ofNullable(lastOperationDate);
    }

    public InstantFilter lastOperationDate() {
        if (lastOperationDate == null) {
            setLastOperationDate(new InstantFilter());
        }
        return lastOperationDate;
    }

    public void setLastOperationDate(InstantFilter lastOperationDate) {
        this.lastOperationDate = lastOperationDate;
    }

    public BooleanFilter getActive() {
        return active;
    }

    public Optional<BooleanFilter> optionalActive() {
        return Optional.ofNullable(active);
    }

    public BooleanFilter active() {
        if (active == null) {
            setActive(new BooleanFilter());
        }
        return active;
    }

    public void setActive(BooleanFilter active) {
        this.active = active;
    }

    public BankAccountTypeFilter getAccountType() {
        return accountType;
    }

    public Optional<BankAccountTypeFilter> optionalAccountType() {
        return Optional.ofNullable(accountType);
    }

    public BankAccountTypeFilter accountType() {
        if (accountType == null) {
            setAccountType(new BankAccountTypeFilter());
        }
        return accountType;
    }

    public void setAccountType(BankAccountTypeFilter accountType) {
        this.accountType = accountType;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public Optional<LongFilter> optionalUserId() {
        return Optional.ofNullable(userId);
    }

    public LongFilter userId() {
        if (userId == null) {
            setUserId(new LongFilter());
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    public LongFilter getOperationId() {
        return operationId;
    }

    public Optional<LongFilter> optionalOperationId() {
        return Optional.ofNullable(operationId);
    }

    public LongFilter operationId() {
        if (operationId == null) {
            setOperationId(new LongFilter());
        }
        return operationId;
    }

    public void setOperationId(LongFilter operationId) {
        this.operationId = operationId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final BankAccountCriteria that = (BankAccountCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(bankNumber, that.bankNumber) &&
            Objects.equals(agencyNumber, that.agencyNumber) &&
            Objects.equals(lastOperationDuration, that.lastOperationDuration) &&
            Objects.equals(meanOperationDuration, that.meanOperationDuration) &&
            Objects.equals(balance, that.balance) &&
            Objects.equals(openingDay, that.openingDay) &&
            Objects.equals(lastOperationDate, that.lastOperationDate) &&
            Objects.equals(active, that.active) &&
            Objects.equals(accountType, that.accountType) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(operationId, that.operationId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            name,
            bankNumber,
            agencyNumber,
            lastOperationDuration,
            meanOperationDuration,
            balance,
            openingDay,
            lastOperationDate,
            active,
            accountType,
            userId,
            operationId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccountCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalName().map(f -> "name=" + f + ", ").orElse("") +
            optionalBankNumber().map(f -> "bankNumber=" + f + ", ").orElse("") +
            optionalAgencyNumber().map(f -> "agencyNumber=" + f + ", ").orElse("") +
            optionalLastOperationDuration().map(f -> "lastOperationDuration=" + f + ", ").orElse("") +
            optionalMeanOperationDuration().map(f -> "meanOperationDuration=" + f + ", ").orElse("") +
            optionalBalance().map(f -> "balance=" + f + ", ").orElse("") +
            optionalOpeningDay().map(f -> "openingDay=" + f + ", ").orElse("") +
            optionalLastOperationDate().map(f -> "lastOperationDate=" + f + ", ").orElse("") +
            optionalActive().map(f -> "active=" + f + ", ").orElse("") +
            optionalAccountType().map(f -> "accountType=" + f + ", ").orElse("") +
            optionalUserId().map(f -> "userId=" + f + ", ").orElse("") +
            optionalOperationId().map(f -> "operationId=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
