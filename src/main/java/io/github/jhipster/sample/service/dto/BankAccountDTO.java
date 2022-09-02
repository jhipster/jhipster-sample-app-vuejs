package io.github.jhipster.sample.service.dto;

import io.github.jhipster.sample.domain.enumeration.BankAccountType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link io.github.jhipster.sample.domain.BankAccount} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BankAccountDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Integer bankNumber;

    private Long agencyNumber;

    private Float lastOperationDuration;

    private Double meanOperationDuration;

    @NotNull
    private BigDecimal balance;

    private LocalDate openingDay;

    private Instant lastOperationDate;

    private Boolean active;

    private BankAccountType accountType;

    @Lob
    private byte[] attachment;

    private String attachmentContentType;

    @Lob
    private String description;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBankNumber() {
        return bankNumber;
    }

    public void setBankNumber(Integer bankNumber) {
        this.bankNumber = bankNumber;
    }

    public Long getAgencyNumber() {
        return agencyNumber;
    }

    public void setAgencyNumber(Long agencyNumber) {
        this.agencyNumber = agencyNumber;
    }

    public Float getLastOperationDuration() {
        return lastOperationDuration;
    }

    public void setLastOperationDuration(Float lastOperationDuration) {
        this.lastOperationDuration = lastOperationDuration;
    }

    public Double getMeanOperationDuration() {
        return meanOperationDuration;
    }

    public void setMeanOperationDuration(Double meanOperationDuration) {
        this.meanOperationDuration = meanOperationDuration;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public LocalDate getOpeningDay() {
        return openingDay;
    }

    public void setOpeningDay(LocalDate openingDay) {
        this.openingDay = openingDay;
    }

    public Instant getLastOperationDate() {
        return lastOperationDate;
    }

    public void setLastOperationDate(Instant lastOperationDate) {
        this.lastOperationDate = lastOperationDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public BankAccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(BankAccountType accountType) {
        this.accountType = accountType;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentContentType() {
        return attachmentContentType;
    }

    public void setAttachmentContentType(String attachmentContentType) {
        this.attachmentContentType = attachmentContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BankAccountDTO)) {
            return false;
        }

        BankAccountDTO bankAccountDTO = (BankAccountDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bankAccountDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BankAccountDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", bankNumber=" + getBankNumber() +
            ", agencyNumber=" + getAgencyNumber() +
            ", lastOperationDuration=" + getLastOperationDuration() +
            ", meanOperationDuration=" + getMeanOperationDuration() +
            ", balance=" + getBalance() +
            ", openingDay='" + getOpeningDay() + "'" +
            ", lastOperationDate='" + getLastOperationDate() + "'" +
            ", active='" + getActive() + "'" +
            ", accountType='" + getAccountType() + "'" +
            ", attachment='" + getAttachment() + "'" +
            ", description='" + getDescription() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
